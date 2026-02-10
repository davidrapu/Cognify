
export default function EmptyPage() {
  return (
    <div className="flex flex-1 h-full flex-col gap-4 p-4 w-full">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-4xl" />
        <div className="bg-muted/50 aspect-video rounded-4xl" />
        <div className="bg-muted/50 aspect-video rounded-4xl" />
      </div>
      <div className="bg-muted/50 min-h-screen flex-1 rounded-4xl md:min-h-min" />
    </div>
  );
}
