"use client";

import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Link from "next/link";
import Layout from "./components/layout";
import MyImage from "./components/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState({ message: "", data: [] });

  // 今回はクライアントサイドで動くため、useEffectが必要.
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  return (
    <div>
      <Layout header="Next.js" title="Top Page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{data.message}</h5>
          <table className="table bg-white">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((value, key) => (
                <tr key={key}>
                  <th>{value.name}</th>
                  <td>{value.mail}</td>
                  <td>{value.age}</td>
                </tr>
              ))}
            </tbody>
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
