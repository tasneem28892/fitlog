"use client";

import { useRef, useState } from "react";
import { Check, Bookmark } from "lucide-react";
import { addToPlan, addToSaved } from "../../lib/storage";

export default function WorkoutActions({ workout }) {
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  const showToast = (text) => {
    setMessage(text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handlePlan = () => {
    const result = addToPlan(workout);
    showToast(result.message);
  };

  const handleSaved = () => {
    const result = addToSaved(workout);
    showToast(result.message);
  };

  return (
    <>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handlePlan}
          className="flex flex-1 items-center justify-center gap-2 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-white"
        >
          <Check size={18} />
          Add to today&apos;s plan
        </button>

        <button
          type="button"
          onClick={handleSaved}
          className="flex flex-1 items-center justify-center gap-2 border border-white/20 px-6 py-4 text-sm font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          <Bookmark size={18} />
          Save for later
        </button>
      </div>

      {message && (
        <div className="mt-4 border border-[#ccff00]/30 bg-[#ccff00]/10 px-4 py-3 text-sm font-bold text-[#ccff00]">
          {message}
        </div>
      )}
    </>
  );
}