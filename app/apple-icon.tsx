import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #090612 0%, #3b0a5c 100%)",
          border: "10px solid #ff2a85",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 64 64" fill="none">
          <path
            d="M14 18L30 32L14 46"
            stroke="#ffde59"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="34" y="42" width="18" height="7" rx="2" fill="#00f0ff" />
        </svg>
      </div>
    ),
    size
  );
}
