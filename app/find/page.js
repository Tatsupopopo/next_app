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
  where,
  query,
} from "firebase/firestore";
import "../components/fire";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // appルーターの場合はこっちからimportする

const db = getFirestore();

export default function Delete(props) {
  const [message, setMessage] = useState("find data");
  const [find, setFind] = useState("");
  const [data, setData] = useState([]);

  const onChangeFind = (e) => {
    setFind(e.target.value);
  };

  const doAction = async () => {
    const q = query(collection(db, "mydata"), where("name", "==", find));

    // await が必要！
    const snap = await getDocs(q);

    const results = [];

    snap.forEach((document) => {
      const docData = document.data();
      results.push(
        <tr key={document.id}>
          <td>
            <a href={"/del?id=" + document.id}>{document.id}</a>
          </td>
          <td>{docData.name}</td>
          <td>{docData.mail}</td>
          <td>{docData.age}</td>
        </tr>
      );
    });

    setData(results);
    setMessage("find: " + find);
  };

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>Find:</label>
              <input
                type="text"
                onChange={onChangeFind}
                className="form-control"
              />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Find
          </button>
        </div>
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
      </Layout>
    </div>
  );
}
