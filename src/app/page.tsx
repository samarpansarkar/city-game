"use client";

import dynamic from "next/dynamic";

const CesiumViewer = dynamic(() => import("./components/CesiumViewer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      Loading Cesium Globe...
    </div>
  ),
});

export default function Page() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CesiumViewer />
    </main>
  );
}
