export function Loading() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-4 h-screen">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-strong border-t-transparent"></div>
      <p className="text-gray-medium text-sm">Loading...</p>
    </div>
  );
}

export default Loading;
