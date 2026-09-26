import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08090c]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        
        <Image
          src="/assets/logo.png"
          alt="FitLog"
          width={80}
          height={30}
          className="h-auto w-[55px] object-contain"
        />

        <p className="text-[9px] text-gray-600 sm:text-[10px]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}