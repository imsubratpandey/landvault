"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [loaderState, setLoaderState] = useState(false);
  return (
    <main>
      <div className="home-page-container">
        <div className="home-page-title">
          LandVault
        </div>
        <div>
          {
            (loaderState == false) ?
              <>
                <Link href="/home"><button className="home-page-button-user" onClick={() => setLoaderState(true)}>Login As User</button></Link>
                <Link href="/admin"><button className="home-page-button-admin" onClick={() => setLoaderState(true)}>Login As Admin</button></Link>
              </>
              :
              <div className="home-svg-loader">
                <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle></svg>
              </div>
          }
        </div>
      </div>
      <div className="home-page-container-disabled-message">
        Only desktop devices are supported.
      </div>
    </main>
  );
}
