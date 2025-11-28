"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Layout from "../components/layout";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import "../components/fire";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // appルーターの場合はこっちからimportする

const db = getFirestore();

export default function Add() {
  const [message, setMessage] = useState("add data");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [age, setAge] = useState(0);
  const router = useRouter();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeMail = (e) => {
    setMail(e.target.value);
  };

  const onChangeAge = (e) => {
    setAge(e.target.value);
  };

  async function doAction(e) {
    const ob = { name: name, mail: mail, age: age };
    await addDoc(collection(db, "mydata"), ob); // コレクションにaddする関数

    router.push("/"); //ページ遷移 router に push する.
  }

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
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
              <label>Age:</label>
              <input
                type="number"
                onChange={onChangeAge}
                className="form-control"
              />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Add
          </button>
        </div>
      </Layout>
    </div>
  );
}
