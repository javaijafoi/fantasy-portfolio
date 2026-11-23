import { ImageResponse } from "next/og";

export const alt = "Peter (@javaijafoi): jogos, histórias interativas e experimentos com IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0d071e 0%, #3b0a5c 55%, #ff2a85 140%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, color: "#00f0ff", letterSpacing: 6, display: "flex" }}>
          FANTASY OS • 5 SISTEMAS
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 16, display: "flex" }}>
          JAVAI-OS
        </div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#fbcfe8", display: "flex" }}>
          Jogos, histórias interativas e experimentos com IA
        </div>
        <div style={{ fontSize: 30, marginTop: 48, color: "#ffde59", display: "flex" }}>
          Peter // @javaijafoi
        </div>
      </div>
    ),
    size,
  );
}
