import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";

function About() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-medium text-white mb-8">About Us</h2>

        <Card className="bg-zinc-900 border-zinc-800 shadow-md">
          <CardContent className="p-6">
            <p className="text-zinc-400 mb-4">
              Welcome to Luxury Automotive, where passion meets precision. We
              specialize in curating the finest collection of luxury, classic,
              and electric vehicles for the discerning automotive enthusiast.
            </p>
            <p className="text-zinc-400 mb-4">
              Our team of experts meticulously selects each vehicle in our
              inventory, ensuring that only the most exceptional automobiles
              bear our mark of approval.
            </p>
            <p className="text-zinc-400">
              With decades of combined experience in the luxury automotive
              industry, we pride ourselves on providing an unparalleled
              purchasing experience that matches the caliber of our vehicles.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/about")({
  component: About,
});
