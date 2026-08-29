export default function MaintenancePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-4 text-center">
      {/* Subtle dotted grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3f3f46 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-lg">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <svg
            className="h-16 w-16 text-[#4ade80] animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mb-3 font-mono text-2xl font-bold text-[#e4e4e7] sm:text-3xl">
          Site Under Maintenance
        </h1>

        {/* Terminal-styled prompt line */}
        <div className="mb-1 flex items-center justify-center gap-2 font-mono text-sm text-[#52525b]">
          <span className="text-[#4ade80]">mel@portfolio</span>
          <span>:</span>
          <span className="text-[#e4e4e7]">~</span>
          <span className="text-[#52525b]">$</span>
          <span className="text-[#a1a1aa]">./status</span>
        </div>

        {/* Message */}
        <p className="mb-8 font-mono text-sm leading-relaxed text-[#a1a1aa] sm:text-base">
          We&apos;re currently doing some housekeeping.{" "}
          <br className="hidden sm:block" />
          The site will be back up shortly — thanks for your patience!
        </p>

        {/* Decorative divider */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="block h-px w-6 bg-[#27272a]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          <span className="block h-px w-6 bg-[#27272a]" />
        </div>

      </div>
    </main>
  );
}