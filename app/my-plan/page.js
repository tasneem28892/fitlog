"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Trash2 } from "lucide-react";
import { getPlan, getSaved, savePlan, saveSaved } from "../../lib/storage";

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState("plan");
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setPlan(getPlan());
      setSaved(getSaved());
      setLoading(false);
    };

    loadData();
  }, []);

  const removeFromPlan = (id) => {
    const updated = plan.filter(
      (workout) => String(workout.id) !== String(id)
    );

    setPlan(updated);
    savePlan(updated);
  };

  const removeFromSaved = (id) => {
    const updated = saved.filter(
      (workout) => String(workout.id) !== String(id)
    );

    setSaved(updated);
    saveSaved(updated);
  };

  const markAsDone = (id) => {
    const updated = plan.filter(
      (workout) => String(workout.id) !== String(id)
    );

    setPlan(updated);
    savePlan(updated);
  };

  const currentList = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#08090c] text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              Loading your plan...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-400 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={16} />
          Back to Library
        </Link>

        <div className="mt-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            YOUR WORKOUTS
          </p>

          <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
            Build your training plan, track your saved workouts, and keep
            today&apos;s session focused.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">

          <div className="border border-white/10 bg-[#111318] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Exercises
            </p>

            <p className="mt-3 text-4xl font-black">
              {plan.length}
            </p>
          </div>

          <div className="border border-white/10 bg-[#111318] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Minutes
            </p>

            <p className="mt-3 text-4xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="border border-white/10 bg-[#111318] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Calories
            </p>

            <p className="mt-3 text-4xl font-black">
              {totalCalories}
            </p>
          </div>

        </div>

        <div className="mt-12 flex border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-4 text-sm font-black uppercase ${
              activeTab === "plan"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-gray-500"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-4 text-sm font-black uppercase ${
              activeTab === "saved"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-gray-500"
            }`}
          >
            Saved
          </button>
        </div>

        {currentList.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-black uppercase">
                Nothing here yet
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                {activeTab === "plan"
                  ? "Add workouts to your plan from the workout details page."
                  : "Save workouts for later from the workout details page."}
              </p>

              <Link
                href="/#library"
                className="mt-6 inline-flex bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black"
              >
                Browse Workouts
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="overflow-hidden border border-white/10 bg-[#111318]"
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups?.map((group) => (
                      <span
                        key={group}
                        className="border border-white/15 px-2 py-1 text-[10px] font-bold uppercase text-gray-400"
                      >
                        {group}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-4 text-xl font-black uppercase">
                    {workout.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {workout.duration} min · {workout.caloriesBurned} kcal
                  </p>

                  <div className="mt-5 flex gap-2">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex-1 border border-white/20 px-3 py-3 text-center text-xs font-black uppercase transition hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => markAsDone(workout.id)}
                          className="flex items-center justify-center border border-[#ccff00] px-3 text-[#ccff00]"
                          title="Mark as done"
                        >
                          <Check size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromPlan(workout.id)}
                          className="flex items-center justify-center border border-white/20 px-3 text-gray-400 hover:text-red-400"
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeFromSaved(workout.id)}
                        className="flex items-center justify-center border border-white/20 px-3 text-gray-400 hover:text-red-400"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}