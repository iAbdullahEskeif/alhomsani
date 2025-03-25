import { createFileRoute } from "@tanstack/react-router";

function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] ">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-rose-600 mr-3"></div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
            About Us
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 border border-zinc-800">
          <p className="text-zinc-400 mb-4">
            Welcome to Luxury Automotive, where passion meets precision. We
            specialize in curating the finest collection of luxury, classic, and
            electric vehicles for the discerning automotive enthusiast.
          </p>
          <p className="text-zinc-400 mb-4">
            Our team of experts meticulously selects each vehicle in our
            inventory, ensuring that only the most exceptional automobiles bear
            our mark of approval.
          </p>
          <p className="text-zinc-400">
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
