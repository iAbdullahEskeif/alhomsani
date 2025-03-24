import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: Contact,
});
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNNTkuOTk5IDYwSDBWMGg1OS45OTlWNjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTU5Ljk5OSA2MEgzMFYzMGgyOS45OTlWNjB6TTMwIDYwSDBWMzBoMzBWNjB6TTU5Ljk5OSAzMEgzMFYwaDI5Ljk5OVYzMHpNMzAgMzBIMFYwaDMwVjMweiIgZmlsbD0iIzFhMWExYSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTUzLjk5OSA2MEg2VjZoNDcuOTk5VjYweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCA0Ny45OTljLTkuOTQxIDAtMTcuOTk5LTguMDU4LTE3Ljk5OS0xNy45OTlTMjAuMDU5IDEyIDMwIDEyczE3Ljk5OSA4LjA1OCAxNy45OTkgMTcuOTk5UzM5Ljk0MSA0Ny45OTkgMzAgNDcuOTk5eiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCA0Ny45OTljLTkuOTQxIDAtMTcuOTk5LTguMDU4LTE3Ljk5OS0xNy45OTlTMjAuMDU5IDEyIDMwIDEyczE3Ljk5OSA4LjA1OCAxNy45OTkgMTcuOTk5UzM5Ljk0MSA0Ny45OTkgMzAgNDcuOTk5em0wLTMxLjk5OGMtNy43MiAwLTEzLjk5OSA2LjI3OS0xMy45OTkgMTMuOTk5UzIyLjI4IDQzLjk5OSAzMCA0My45OTlzMTMuOTk5LTYuMjc5IDEzLjk5OS0xMy45OTlTMzcuNzIgMTYuMDAxIDMwIDE2LjAwMXoiIGZpbGw9IiMxYTFhMWEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik0zMCAzNS45OTljLTMuMzE0IDAtNS45OTktMi42ODYtNS45OTktNS45OTlTMjYuNjg2IDI0IDMwIDI0czUuOTk5IDIuNjg2IDUuOTk5IDUuOTk5UzMzLjMxNCAzNS45OTkgMzAgMzUuOTk5eiIgZmlsbD0iIzFhMWExYSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-rose-600 mr-3"></div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
            Contact Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-rose-900/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Email</p>
                  <p className="text-white">info@luxuryautomotive.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-rose-900/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Phone</p>
                  <p className="text-white">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-rose-900/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Address</p>
                  <p className="text-white">123 Luxury Lane</p>
                  <p className="text-white">Beverly Hills, CA 90210</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <p className="text-zinc-400 text-sm">
                Our showroom is open Monday through Saturday, 9:00 AM to 7:00
                PM. Schedule a test drive or consultation with our luxury
                vehicle specialists.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-6">
              Send a Message
            </h3>

            {submitSuccess ? (
              <div className="p-4 bg-zinc-800 border border-emerald-900/50 rounded-lg">
                <p className="text-emerald-500">
                  Your message has been sent successfully. We'll get back to you
                  soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-zinc-400 mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-2 text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-2 text-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting
                      ? "bg-rose-800 cursor-not-allowed"
                      : "bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600"
                  } text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-rose-600/20 flex items-center justify-center`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
