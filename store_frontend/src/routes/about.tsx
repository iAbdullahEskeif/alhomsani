import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../context/theme-context";

function About() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-[var(--background)]"}`}
    >
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-rose-600 mr-3"></div>
          <h2
            className={`text-3xl font-bold ${theme === "dark" ? "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white" : "text-zinc-800"}`}
          >
            About Us
          </h2>
        </div>

        <div
          className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-[var(--card)] border-[var(--border)]"} rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-6 border`}
        >
          <p
            className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-4`}
          >
            Welcome to Luxury Automotive, where passion meets precision. We
            specialize in curating the finest collection of luxury, classic, and
            electric vehicles for the discerning automotive enthusiast.
          </p>
          <p
            className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-4`}
          >
            Our team of experts meticulously selects each vehicle in our
            inventory, ensuring that only the most exceptional automobiles bear
            our mark of approval.
          </p>
          <p
            className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
          >
            With decades of combined experience in the luxury automotive
            industry, we pride ourselves on providing an unparalleled purchasing
            experience that matches the caliber of our vehicles.
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/about")({
  component: About,
});
