"use client";

import Layout from "../components/layout";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import "../components/fire";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // appルーターの場合はこっちからimportする

const db = getFirestore();

export default function Delete(props) {
  const [message, setMessage] = useState("wait...");
  const [data, setData] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) return;

    setMessage("Delete id = " + id);

    // ★ 1件取得は getDoc(doc(...)) を使う
    // Promise が解決されるタイミング: Firestore がデータを取得し終わった後。
    // then の処理: Promise が解決された後に実行される。
    // await の処理: Promise が解決された後に次の行が実行される。
    const ref = doc(db, "mydata", id);
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        setData(snap.data());
      } else {
        setMessage("No data found for id = " + id);
      }
    });
  }, [searchParams]);

  const doAction = async () => {
    const id = searchParams.get("id");
    if (!id) return;

    await deleteDoc(doc(db, "mydata", id));
    router.push("/");
  };

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <pre className="card p-3 m-3 h5 text-left">
            Name: {data !== null ? data.name : "..."} <br />
            Mail: {data !== null ? data.mail : "..."} <br />
            Age: {data !== null ? data.age : "..."}
          </pre>
          <button onClick={doAction} className="btn btn-primary">
            Delete
          </button>
        </div>
      </Layout>
    </div>
  );
}
