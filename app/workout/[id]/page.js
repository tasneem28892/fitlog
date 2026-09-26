import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import WorkoutActions from "../../components/WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id) {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts = await response.json();

  return workouts.find(
    (workout) => String(workout.id) === String(id)
  );
}

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#08090c] px-5 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-black uppercase">
            Workout Not Found
          </h1>

          <p className="mt-4 text-gray-500">
            The workout you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black"
          >
            Back to Workouts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-400 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={16} />
          Back to Library
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">

          <div className="overflow-hidden border border-white/10 bg-[#111318]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[500px] w-full object-cover"
            />
          </div>

          <div className="py-2">

            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="border border-[#ccff00]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00]"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Key Specs */}
            <div className="mt-8 border-y border-white/10">

              <div className="flex items-center justify-between border-b border-white/10 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Equipment
                </span>

                <span className="text-sm font-bold text-white">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Difficulty
                </span>

                <span className="text-sm font-bold text-white">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Sets
                </span>

                <span className="text-sm font-bold text-white">
                  {workout.sets}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Reps
                </span>

                <span className="text-sm font-bold text-white">
                  {workout.reps}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Duration
                </span>

                <span className="text-sm font-bold text-white">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Calories
                </span>

                <span className="text-sm font-bold text-white">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Rating
                </span>

                <span className="flex items-center gap-2 text-sm font-bold text-white">
                  <Star size={15} />
                  {workout.rating}
                </span>
              </div>

            </div>

            {/* Instructions */}
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                Instructions
              </p>

              <ol className="mt-5 space-y-5">
                {workout.instructions?.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 text-xs font-bold text-[#ccff00]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-6 text-gray-400">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <WorkoutActions workout={workout} />

          </div>
        </div>
      </div>
    </main>
  );
}