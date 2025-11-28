import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Link from "next/link";
import Layout from "../components/layout";

export default function Other() {
  const title = "Other";

  return (
    <div>
      <Layout header="Next.js" title="Other Page">
        <div className="card p-4 text-center">
          <h5 className="mb-4">This is Other page...</h5>
          <Link href="/">
            <button className="btn btn-primary">Back to Home page</button>
          </Link>
        </div>
      </Layout>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
