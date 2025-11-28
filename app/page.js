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
import { collection, getDocs } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export default function Home() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("wait...");

  // 1) 認証状態の変化を監視
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMessage("logined: " + user.displayName);
        loadData(); // ログイン後にデータ読み込み
      } else {
        setMessage("not logined");
      }
    });

    return () => unsub();
  }, []);

  // 2) Google ログイン実行
  const login = () => {
    signInWithPopup(auth, provider).catch((err) => {
      setMessage("ERROR: " + err.message);
    });
  };

  // 3) Firestore データ読み込み
  const loadData = async () => {
    const mydata = [];
    const snapshot = await getDocs(collection(db, "mydata"));

    snapshot.forEach((doc) => {
      const d = doc.data();
      mydata.push(
        <tr key={doc.id}>
          <td>
            <a href={"/del?id=" + doc.id}>{doc.id}</a>
          </td>
          <td>{d.name}</td>
          <td>{d.mail}</td>
          <td>{d.age}</td>
        </tr>
      );
    });

    setData(mydata);
  };

  return (
    <div>
      <Layout header="Next.js" title="Top Page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>

          <button className="btn btn-primary mb-3" onClick={login}>
            Google Login
          </button>

          <table className="table bg-white text-left">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mail</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      </Layout>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
