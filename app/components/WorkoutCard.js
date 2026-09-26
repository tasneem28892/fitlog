"use client";

import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden border border-white/10 bg-[#111318] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/60"
    >
      <div className="overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups?.map((group) => (
            <span
              key={group}
              className="border border-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-300"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-black uppercase leading-tight">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-gray-500">{workout.equipment}</p>

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-white/10 pt-4 sm:grid-cols-3 sm:gap-0">
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-gray-400">
            <Clock3 size={14} />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5 text-xs text-gray-400">
            <Flame size={14} />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5 text-xs text-gray-400">
            <Star size={14} />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}