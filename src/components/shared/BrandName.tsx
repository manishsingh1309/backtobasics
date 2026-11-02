type Variant = "mixed" | "upper";

interface Props {
  variant?: Variant;
  className?: string;
}

export default function BrandName({ variant = "upper", className }: Props) {
  const text = variant === "upper" ? "BIGRONJONES" : "BigRonJones";
  return (
    <span className={className} style={{ whiteSpace: "nowrap" }}>
      {text}
      <span
        aria-label="registered trademark"
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "0.22em",
          verticalAlign: "2.25em",
          lineHeight: 1,
          fontWeight: 700,
          letterSpacing: 0,
          marginLeft: "0.08em",
          display: "inline-block",
        }}
      >
        ®
      </span>
    </span>
  );
}
