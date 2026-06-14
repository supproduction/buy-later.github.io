/** Lightweight prose wrapper for legal/info pages. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="card space-y-4 p-6 text-sm leading-relaxed text-ink-700 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-ink-900 [&_li]:ml-1 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
      {children}
    </div>
  );
}
