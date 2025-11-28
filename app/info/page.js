"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Layout from "../components/layout";

import { useState, useEffect } from "react";
import { db, auth } from "../components/fire";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

export default function Info() {
  const [message, setMessage] = useState("address info");
  const [cmt, setCmt] = useState("");
  const [mydata, setMydata] = useState(null);
  const [msgdata, setMsgdata] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // ログインしていないならトップへ
  useEffect(() => {
    if (!auth.currentUser) router.push("/");
  }, [router]);

  // 相手の基本情報取得
  useEffect(() => {
    if (!auth.currentUser || !id) return;

    const fetchUser = async () => {
      const email = auth.currentUser.email;

      const docSnap = await getDoc(doc(db, "address", email, "address", id));
      if (docSnap.exists()) {
        setMydata(docSnap.data());
      } else {
        setMessage("相手の情報が見つかりません");
      }
    };

    fetchUser();
  }, [id]);

  // 🔥 メッセージをリアルタイム取得
  useEffect(() => {
    if (!auth.currentUser || !id) return;

    const email = auth.currentUser.email;

    const msgRef = collection(db, "address", email, "address", id, "message");
    const q = query(msgRef, orderBy("time", "asc"));

    // onSnapshot でリアルタイム購読
    const unsubscribe = onSnapshot(q, (snap) => {
      const msgs = [];
      snap.forEach((doc) => {
        msgs.push(
          <li className="list-group-item px-3 py-1" key={doc.id}>
            {doc.data().comment}
          </li>
        );
      });
      setMsgdata(msgs);
    });

    // クリーンアップ（画面遷移時に購読停止）
    return () => unsubscribe();
  }, [id]);

  // メッセージ入力
  const onChange = (e) => setCmt(e.target.value);

  // メッセージ投稿
  const doAction = async () => {
    if (!cmt) return;

    const t = new Date().getTime();
    const email = auth.currentUser.email;

    const to = { comment: "To: " + cmt, time: t };
    const from = { comment: "From: " + cmt, time: t };

    await addDoc(
      collection(db, "address", email, "address", id, "message"),
      to
    );
    await addDoc(
      collection(db, "address", id, "address", email, "message"),
      from
    );

    setCmt(""); // 入力欄クリア
  };

  // トップに戻る
  const goBack = () => router.push("/");

  return (
    <div>
      <Layout header="Next.js" title="Info page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>

          {mydata && (
            <div className="text-left mb-3">
              <div>Name: {mydata.name}</div>
              <div>Mail: {mydata.mail}</div>
              <div>Tel: {mydata.tel}</div>
              <div>Memo: {mydata.memo}</div>
            </div>
          )}

          <button className="btn btn-secondary mb-3" onClick={goBack}>
            トップに戻る
          </button>

          <ul className="list-group mb-3">{msgdata}</ul>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={cmt}
              onChange={onChange}
              placeholder="メッセージを入力"
            />
            <button className="btn btn-primary" onClick={doAction}>
              投稿
            </button>
          </div>
        </div>
      </Layout>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
