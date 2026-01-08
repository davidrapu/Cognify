
type progressPropType = {
  value: number,
  max: number
}

export default function Progress({value, max}: progressPropType) {
  return (
    <div
      role="progressbar"
      className="h-2 w-full rounded-full bg-primary/20 overflow-hidden"
    >
      <div
        className="h-full bg-primary rounded-full transition-all duration-200 ease-in-out"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}
