import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Link from "next/link";
import Layout from "./components/layout";
import MyImage from "./components/image";

export default function Home() {
  const title = "Index";

  return (
    <div>
      <Layout header="Next.js" title="Top Page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">Welcome to next.js!</h5>
          <MyImage fname="image.jpg" size="300" />
        </div>
      </Layout>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
