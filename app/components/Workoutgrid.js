"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import Loading from "./Loading";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutGrid() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Workout fetch error:", error);
        setError("Unable to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const copied = [...workouts];

    copied.sort((a, b) => {
      if (sortBy === "duration") {
        return Number(a.duration) - Number(b.duration);
      }

      if (sortBy === "calories") {
        return Number(a.caloriesBurned) - Number(b.caloriesBurned);
      }

      if (sortBy === "rating") {
        return Number(b.rating) - Number(a.rating);
      }

      return 0;
    });

    return copied;
  }, [workouts, sortBy]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section className="flex min-h-[400px] items-center justify-center px-5">
        <p className="text-center text-sm font-bold uppercase tracking-wide text-red-400">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8"
    >
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase sm:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-gray-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full appearance-none rounded-full border border-white/15 bg-[#111318] py-3 pl-5 pr-11 text-sm font-bold text-white outline-none transition focus:border-[#ccff00] sm:w-44"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </section>
  );
}