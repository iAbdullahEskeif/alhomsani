import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNNTkuOTk5IDYwSDBWMGg1OS45OTlWNjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTU5Ljk5OSA2MEgzMFYzMGgyOS45OTlWNjB6TTMwIDYwSDBWMzBoMzBWNjB6TTU5Ljk5OSAzMEgzMFYwaDI5Ljk5OVYzMHpNMzAgMzBIMFYwaDMwVjMweiIgZmlsbD0iIzFhMWExYSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTUzLjk5OSA2MEg2VjZoNDcuOTk5VjYweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCA0Ny45OTljLTkuOTQxIDAtMTcuOTk5LTguMDU4LTE3Ljk5OS0xNy45OTlTMjAuMDU5IDEyIDMwIDEyczE3Ljk5OSA4LjA1OCAxNy45OTkgMTcuOTk5UzM5Ljk0MSA0Ny45OTkgMzAgNDcuOTk5eiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCA0Ny45OTljLTkuOTQxIDAtMTcuOTk5LTguMDU4LTE3Ljk5OS0xNy45OTlTMjAuMDU5IDEyIDMwIDEyczE3Ljk5OSA4LjA1OCAxNy45OTkgMTcuOTk5UzM5Ljk0MSA0Ny45OTkgMzAgNDcuOTk5em0wLTMxLjk5OGMtNy43MiAwLTEzLjk5OSA2LjI3OS0xMy45OTkgMTMuOTk5UzIyLjI4IDQzLjk5OSAzMCA0My45OTlzMTMuOTk5LTYuMjc5IDEzLjk5OS0xMy45OTlTMzcuNzIgMTYuMDAxIDMwIDE2LjAwMXoiIGZpbGw9IiMxYTFhMWEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik0zMCAzNS45OTljLTMuMzE0IDAtNS45OTktMi42ODYtNS45OTktNS45OTlTMjYuNjg2IDI0IDMwIDI0czUuOTk5IDIuNjg2IDUuOTk5IDUuOTk5UzMzLjMxNCAzNS45OTkgMzAgMzUuOTk5eiIgZmlsbD0iIzFhMWExYSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]">
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
