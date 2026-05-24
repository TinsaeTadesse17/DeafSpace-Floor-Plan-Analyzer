import Image from "next/image";

type LogoProps = {
  size?: number;
  showLabel?: boolean;
  className?: string;
};

export default function Logo({
  size = 40,
  showLabel = false,
  className = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.svg"
        alt="DeafSpace Floor Plan Analyzer"
        width={size}
        height={size}
        priority
      />
      {showLabel && (
        <span className="font-bold text-white text-lg tracking-tight">
          DeafSpace <span className="text-teal-400">AI</span>
        </span>
      )}
    </div>
  );
}
