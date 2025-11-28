"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Layout from "./components/layout";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./components/fire";
import { useState, useEffect } from "react";

const db = getFirestore(); // 実行ファイルを介してFirebaseプロジェクトを取得する

export default function Home() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("wait...");

  useEffect(() => {
    const fetchData = async () => {
      // asyncで{}内の処理を非同期通信で行う
      const snapshot = await getDocs(collection(db, "mydata")); // awaitで処理順番を調整. collectionでdb内のmydataコレクションを取得. getDocsですべてのドキュメントを配列で取得
      const mydata = [];
      snapshot.forEach((document) => {
        const doc = document.data(); // snapshot内の1つ1つのdocumentに対して、内部のデータを取得
        mydata.push(
          <tr key={document.id}>
            <td>
              <a href={"/del?id=" + document.id}>{document.id}</a>
            </td>
            <td>{doc.name}</td>
            <td>{doc.mail}</td>
            <td>{doc.age}</td>
          </tr>
        );
      });
      setData(mydata);
      setMessage("Firebase data");
    };

    fetchData();
  }, []);

  return (
    <div>
      <Layout header="Next.js" title="Top Page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
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
