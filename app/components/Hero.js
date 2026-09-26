export default function Hero() {
  return (
    <section className="bg-[#15171c]">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-12 lg:px-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          
          <div className="max-w-2xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="font-display text-5xl font-bold uppercase leading-[0.88] tracking-tight sm:text-6xl lg:text-[68px]">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-7 inline-flex items-center bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase text-black transition hover:bg-white"
            >
              Browse Workouts
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <img
              src="/assets/banner.png"
              alt="Workout illustration"
              className="w-full max-w-[430px] object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}