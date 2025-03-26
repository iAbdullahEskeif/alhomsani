import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../context/theme-context";

function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-[var(--background)]"}`}
    >
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-rose-600 mr-3"></div>
          <h2
            className={`text-3xl font-bold ${theme === "dark" ? "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white" : "text-zinc-800"}`}
          >
            Contact Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-[var(--card)] border-[var(--border)]"} rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-6 border`}
          >
            <h3
              className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-zinc-800"} mb-6`}
            >
              Get In Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div
                  className={`w-10 h-10 ${theme === "dark" ? "bg-rose-900/20" : "bg-rose-100"} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}
                >
                  <Mail className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p
                    className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} text-sm`}
                  >
                    Email
                  </p>
                  <p
                    className={`${theme === "dark" ? "text-white" : "text-zinc-800"}`}
                  >
                    info@luxuryautomotive.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`w-10 h-10 ${theme === "dark" ? "bg-rose-900/20" : "bg-rose-100"} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}
                >
                  <Phone className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p
                    className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} text-sm`}
                  >
                    Phone
                  </p>
                  <p
                    className={`${theme === "dark" ? "text-white" : "text-zinc-800"}`}
                  >
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`w-10 h-10 ${theme === "dark" ? "bg-rose-900/20" : "bg-rose-100"} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}
                >
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p
                    className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} text-sm`}
                  >
                    Address
                  </p>
                  <p
                    className={`${theme === "dark" ? "text-white" : "text-zinc-800"}`}
                  >
                    123 Luxury Lane
                  </p>
                  <p
                    className={`${theme === "dark" ? "text-white" : "text-zinc-800"}`}
                  >
                    Beverly Hills, CA 90210
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`mt-8 p-4 ${theme === "dark" ? "bg-zinc-800/50 border-zinc-700" : "bg-[var(--input-light)] border-[var(--input-border-light)]"} rounded-lg border`}
            >
              <p
                className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} text-sm`}
              >
                Our showroom is open Monday through Saturday, 9:00 AM to 7:00
                PM. Schedule a test drive or consultation with our luxury
                vehicle specialists.
              </p>
            </div>
          </div>

          <div
            className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-[var(--card)] border-[var(--border)]"} rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-6 border`}
          >
            <h3
              className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-zinc-800"} mb-6`}
            >
              Send a Message
            </h3>

            {submitSuccess ? (
              <div
                className={`p-4 ${theme === "dark" ? "bg-zinc-800 border-emerald-900/50" : "bg-emerald-50 border-emerald-200"} rounded-lg border`}
              >
                <p className="text-emerald-500">
                  Your message has been sent successfully. We'll get back to you
                  soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className={`block ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-2 text-sm`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500" : "bg-[var(--input-light)] border-[var(--input-border-light)] text-zinc-800 placeholder-zinc-500"} border rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    className={`block ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-2 text-sm`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500" : "bg-[var(--input-light)] border-[var(--input-border-light)] text-zinc-800 placeholder-zinc-500"} border rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors`}
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label
                    className={`block ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-2 text-sm`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500" : "bg-[var(--input-light)] border-[var(--input-border-light)] text-zinc-800 placeholder-zinc-500"} border rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors`}
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label
                    className={`block ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-2 text-sm`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full px-4 py-2 ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500" : "bg-[var(--input-light)] border-[var(--input-border-light)] text-zinc-800 placeholder-zinc-500"} border rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors`}
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

export const Route = createFileRoute("/contact")({
  component: Contact,
});
