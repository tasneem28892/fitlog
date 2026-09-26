"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlan, getSaved } from "../../lib/storage";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      setPlanCount(getPlan().length);
      setSavedCount(getSaved().length);
    };

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("fitlog-storage-update", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("fitlog-storage-update", updateCounts);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#08090c]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={110}
            height={40}
            className="h-auto w-[100px] object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#library"
            className="text-sm font-bold uppercase text-white transition hover:text-[#ccff00]"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-bold uppercase text-gray-400 transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black"
          >
            Plan <span className="ml-1">{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-black uppercase text-white"
          >
            Saved <span className="ml-1">{savedCount}</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}