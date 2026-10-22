export default function Loading() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl animate-pulse bg-slate-100 border border-slate-200"
          />
        ))}
    </div>
  );
}
