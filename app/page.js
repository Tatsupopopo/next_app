"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Layout from "./components/layout";

import { useState, useEffect } from "react";

import { db, auth } from "./components/fire";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, documentId, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const provider = new GoogleAuthProvider();

export default function Home() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("Please Login...");
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
        loadData();
      } else {
        setUser(null);
        setData([]);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) {
      setMessage(`${user} さんの登録アドレス`);
    } else {
      setMessage("Please Login...");
    }
  }, [user]);

  const login = () => {
    signInWithPopup(auth, provider).catch((err) =>
      setMessage("ERROR: " + err.message)
    );
  };

  const logout = () => {
    auth.signOut();
  };

  const doLog = () => {
    if (!auth.currentUser) login();
    else logout();
  };

  // /add への移動
  const doAction = () => {
    router.push("/add");
  };

  // アドレスページへの移動
  const doLink = (e) => {
    const id = e.target.id;
    router.push("/info?id=" + id);
  };

  // Firestore へのアドレスデータ読み込み
  const loadData = async () => {
    const addresses = [];
    const email = auth.currentUser.email;

    const subColRef = collection(db, "address", email, "address");
    const snapshot = await getDocs(subColRef);

    snapshot.forEach((document) => {
      const doc = document.data();
      addresses.push(
        <li
          className="list-group-item list-group-item-action p-1"
          onClick={doLink}
          id={document.id}
          key={document.id}
        >
          {doc.flag ? "✓" : ""} {doc.name}（{doc.mail}）
        </li>
      );
    });

    setData(addresses);
    setUser(auth.currentUser.displayName);
    setMessage(auth.currentUser.displayName + " さんの登録アドレス");
  };

  return (
    <div>
      <Layout header="Next.js" title="Top Page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <button className="btn btn-primary mb-3" onClick={doLog}>
            {auth.currentUser == null ? "Login" : "Logout"}
          </button>
          <ul className="list-group">{data}</ul>
          <hr />
          <button className="btn btn-primary" onClick={doAction}>
            Add address
          </button>
        </div>
      </Layout>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
