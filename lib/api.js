"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.log("Error loading workouts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <main className="min-h-screen bg-[#08090c] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="py-10 md:py-20">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-4xl text-5xl font-black uppercase leading-tight md:text-7xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-5 max-w-2xl text-zinc-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today's plan, and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="mt-7 inline-block rounded-md bg-[#ccff00] px-5 py-3 text-sm font-bold text-black"
          >
            BROWSE WORKOUTS
          </a>
        </section>

        <section id="library" className="py-10">
          <p className="text-sm font-semibold tracking-widest text-[#ccff00]">
            WORKOUTS
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-zinc-500">
            Twelve lifts covering every major muscle group.
          </p>

          {loading && (
            <div className="flex min-h-60 items-center justify-center">
              <p className="text-[#ccff00]">Loading workouts...</p>
            </div>
          )}

          {!loading && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#111318]"
                >
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      {workout.muscleGroups?.map((muscle) => (
                        <span
                          key={muscle}
                          className="rounded-full bg-[#ccff00] px-2.5 py-1 text-xs font-bold text-black"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>

                    <h3 className="mt-4 text-xl font-black uppercase">
                      {workout.name}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-5 flex justify-between border-t border-white/10 pt-4 text-sm text-zinc-400">
                      <span>{workout.duration} min</span>
                      <span>{workout.caloriesBurned} kcal</span>
                      <span>★ {workout.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}