export default function Loading() {
  return (
    <section className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center px-5">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

        <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
          Loading workouts...
        </p>
      </div>
    </section>
  );
}