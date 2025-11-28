"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Layout from "../components/layout";

import { useState, useEffect } from "react";

import { db, auth } from "../components/fire";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Add() {
  const [message, setMessage] = useState("Add address");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [tel, setTel] = useState(null);
  const [memo, setMemo] = useState("");
  const router = useRouter();

  // ログインしていなければトップへ戻る
  useEffect(() => {
    if (auth.currentUser == null) {
      router.push("/");
    } else {
      return;
    }
  }, []);

  // フォーム入力時の挙動
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeMail = (e) => {
    setMail(e.target.value);
  };

  const onChangeTel = (e) => {
    setTel(e.target.value);
  };

  const onChangeMemo = (e) => {
    setMemo(e.target.value);
  };

  // 登録ボタン押下時の挙動
  const doAction = async () => {
    const email = auth.currentUser.email;
    const ob = { name: name, mail: mail, tel: tel, memo: memo, flag: false };
    await addDoc(collection(db, "address", email, "address"), ob); // コレクションにaddする関数

    router.push("/"); //ページ遷移 router に push する.
  };

  // トップに戻る
  const goBack = () => {
    router.push("/");
  };

  return (
    <div>
      <Layout header="Next.js" title="Create data.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                onChange={onChangeName}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Mail:</label>
              <input
                type="text"
                onChange={onChangeMail}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Tel:</label>
              <input
                type="number"
                onChange={onChangeTel}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Memo:</label>
              <input
                type="text"
                onChange={onChangeMemo}
                className="form-control"
              />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary m-3">
            Add
          </button>
          <button onClick={goBack} className="btn">
            Go Back
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
