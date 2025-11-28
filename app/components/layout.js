import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Header from "./header"
import Footer from "./footer"

export default function Layout(props) {
  return (
    <div>
      <Header header={props.header} />
      <div className="container">
        <h3 className="my-3 text-primary text-center">{props.title}</h3>
        {props.children}
      </div>
      <Footer footer="copyright TATSUKI-Yotsushima" />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
