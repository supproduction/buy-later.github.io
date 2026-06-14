/** Small persistent label reminding users the experience is simulated. */
export function SimulationBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`chip bg-amber-100 text-amber-800 ${className}`}
      title="This is a simulation. No real purchase happens."
    >
      <span aria-hidden="true" className="mr-1">
        🧪
      </span>
      Simulation
    </span>
  );
}
