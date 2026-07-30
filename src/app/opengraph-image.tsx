import { ImageResponse } from "next/og";

export const alt =
  "Dreamweavers — Digital products, software, AI and commerce systems";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #f6f5f0 0%, #eef3f4 55%, #dce8eb 100%)",
          color: "#101415",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(52, 94, 109, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 94, 109, 0.09) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Decorative circle — rendered before content instead of z-index */}
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            right: -110,
            top: -180,
            display: "flex",
            borderRadius: "50%",
            border: "2px solid rgba(68, 113, 130, 0.25)",
            background:
              "radial-gradient(circle at 35% 35%, rgba(126, 175, 190, 0.72), rgba(45, 91, 108, 0.22) 42%, rgba(10, 36, 47, 0.04) 70%)",
          }}
        />

        {/* Inner orbit */}
        <div
          style={{
            position: "absolute",
            width: 390,
            height: 390,
            right: 10,
            top: -45,
            display: "flex",
            borderRadius: "50%",
            border: "1px solid rgba(24, 67, 83, 0.34)",
          }}
        />

        {/* Brand mark */}
        <div
          style={{
            position: "absolute",
            top: 58,
            left: 64,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 74,
              height: 74,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              background: "#355f70",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "-3px",
            }}
          >
            DW
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 27,
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              DREAM
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "5px",
                color: "#355f70",
              }}
            >
              WEAVERS
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 65,
            width: 820,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: 22,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "5px",
              color: "#416f80",
              textTransform: "uppercase",
            }}
          >
            Independent digital studio
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              lineHeight: 0.95,
              letterSpacing: "-5px",
              fontWeight: 800,
            }}
          >
            <div style={{ display: "flex" }}>We weave digital systems</div>

            <div
              style={{
                display: "flex",
                marginTop: 12,
                color: "#416f80",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              that move business.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              width: 730,
              fontSize: 22,
              lineHeight: 1.4,
              color: "#526166",
            }}
          >
            Software, digital commerce, AI, automation and growth systems
            designed to work as one.
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 32,
            height: 2,
            display: "flex",
            background:
              "linear-gradient(90deg, #416f80 0%, rgba(65, 111, 128, 0.1) 75%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}