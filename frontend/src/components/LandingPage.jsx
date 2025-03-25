"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  UserCheck,
  Shield,
  Activity,
  ChevronDown,
} from "lucide-react";

function LandingPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    testimonials: false,
    cta: false,
  });

  useEffect(() => {
    setIsVisible({
      hero: true,
      features: true,
      testimonials: true,
      cta: true,
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      document.querySelectorAll("[data-scroll]").forEach((element) => {
        const position = element.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= position + 100) {
          element.classList.add("animate-slide-up");
          element.classList.add("opacity-100");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-x py-20 md:py-32 transition-opacity duration-1000 ${
          isVisible.hero ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Skip The Wait, <br />
              <span className="text-yellow-300">Cut The Queue</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Revolutionizing healthcare queuing systems for a seamless patient
              experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 rounded-full bg-white text-purple-600 font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
              >
                GetStarted <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/signin"
                className="px-8 py-3 rounded-full bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                SignIn
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background" data-scroll>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose CutTheQueue?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform offers a comprehensive solution to streamline
              healthcare queuing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="w-10 h-10 text-primary" />,
                title: "Save Time",
                description:
                  "Reduce waiting times by up to 60% with our smart queue management system",
              },
              {
                icon: <UserCheck className="w-10 h-10 text-green-500" />,
                title: "Easy Registration",
                description:
                  "Simple and secure patient registration process with minimal information required",
              },
              {
                icon: <Shield className="w-10 h-10 text-purple-500" />,
                title: "Secure Records",
                description:
                  "Your medical history and personal information are protected with enterprise-grade security",
              },
              {
                icon: <Activity className="w-10 h-10 text-red-500" />,
                title: "Real-time Updates",
                description:
                  "Get instant notifications about your queue status and estimated waiting time",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card hover-scale"
              >
                <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50" data-scroll>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A simple three-step process to transform your healthcare
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Register",
                description:
                  "Create your account with basic information and upload your medical history",
              },
              {
                step: "02",
                title: "Generate Token",
                description:
                  "Request a queue token for your preferred department and doctor",
              },
              {
                step: "03",
                title: "Track Status",
                description:
                  "Monitor your position in the queue and receive notifications when it's your turn",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-card hover-scale"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background" data-scroll>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from patients and healthcare providers who use CutTheQueue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "CutTheQueue has transformed our hospital's waiting room experience. Patients are happier and our staff is more efficient.",
                name: "Dr. Sarah Johnson",
                role: "Chief of Medicine, City Hospital",
              },
              {
                quote:
                  "I used to spend hours waiting at the clinic. Now I can track my position in the queue from home and arrive just in time for my appointment.",
                name: "Michael Chen",
                role: "Patient",
              },
              {
                quote:
                  "The medical history feature is a game-changer. My doctors have immediate access to my records, making consultations much more productive.",
                name: "Priya Sharma",
                role: "Regular Patient",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card hover-scale"
              >
                <div className="mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50" data-scroll>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How do I register as a new patient?",
                answer:
                  "Registration is simple! Click on the 'Sign Up' button, fill in your basic information, upload your medical history if available, and you're all set.",
              },
              {
                question: "Is my medical information secure?",
                answer:
                  "Absolutely. We use industry-standard encryption and security protocols to ensure your medical data is protected at all times.",
              },
              {
                question: "Can I use CutTheQueue for any hospital?",
                answer:
                  "CutTheQueue works with partner hospitals and clinics. Check our partner list to see if your healthcare provider is included.",
              },
              {
                question: "How accurate are the waiting time estimates?",
                answer:
                  "Our algorithm provides estimates based on real-time data from the healthcare facility. While not exact, they're typically accurate within a 10-15 minute window.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white" data-scroll>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your healthcare experience?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of patients who have already cut the queue and
              saved countless hours in waiting rooms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 rounded-full bg-white text-primary font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
              >
                Get Started Now
              </Link>
              <Link
                to="/signin"
                className="px-8 py-3 rounded-full bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
