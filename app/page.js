import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkoutGrid from "./components/Workoutgrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      <Navbar />
      <Hero />
      <WorkoutGrid />
    </main>
  );
}