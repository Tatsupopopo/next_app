"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Layout from "./components/layout";
import useSWR from "swr";

export default function Home() {
  // SWR を使用する際は fetcher 関数を定義すること.
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/data.json", fetcher);

  return (
    <div>
      <Layout header="Next.js" title="Top Page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            {data != undefined ? data.message : "error..."}
          </h5>
          <table className="table bg-white">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {data != undefined ? (
                data.data.map((value, key) => (
                  <tr key={key}>
                    <th>{value.name}</th>
                    <td>{value.mail}</td>
                    <td>{value.age}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th></th>
                  <td>No data.</td>
                  <td></td>
                </tr>
              )}
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
