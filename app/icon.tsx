import { ImageResponse } from "next/og";

export function generateImageMetadata() {
  return [
    {
      id: "48",
      contentType: "image/png",
      size: { width: 48, height: 48 },
      alt: "JAVAI-OS",
    },
    {
      id: "192",
      contentType: "image/png",
      size: { width: 192, height: 192 },
      alt: "JAVAI-OS",
    },
    {
      id: "512",
      contentType: "image/png",
      size: { width: 512, height: 512 },
      alt: "JAVAI-OS",
    },
  ];
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const iconId = String(await id);
  const dim = iconId === "512" ? 512 : iconId === "192" ? 192 : 48;
  const radius = Math.round(dim * 0.22);
  const borderWidth = Math.max(2, Math.round(dim * 0.06));
  const glyphSize = Math.round(dim * 0.62);

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
          borderRadius: radius,
          border: `${borderWidth}px solid #ff2a85`,
        }}
      >
        <svg
          width={glyphSize}
          height={glyphSize}
          viewBox="0 0 64 64"
          fill="none"
        >
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
    { width: dim, height: dim }
  );
}
