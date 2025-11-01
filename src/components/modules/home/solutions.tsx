
import {
  Search,
  UserCheck,
  Calendar,
  FileText,
  Video,
  CreditCard,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const solutions = [
  {
    id: 1,
    title: "Search Doctor",
    description: "Find the right specialist for your needs.",
    icon: Search,
    color: "text-red-500",
  },
  {
    id: 2,
    title: "Check Doctor Profile",
    description: "View verified credentials and patient reviews.",
    icon: UserCheck,
    color: "text-green-500",
  },
  {
    id: 3,
    title: "Schedule Appointment",
    description: "Book consultations quickly and easily.",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    id: 4,
    title: "Get Your Solution",
    description: "Receive personalized medical advice online.",
    icon: FileText,
    color: "text-purple-500",
  },
  {
    id: 5,
    title: "Electronic Prescription",
    description: "Get prescriptions delivered digitally.",
    icon: FileText,
    color: "text-yellow-500",
  },
  {
    id: 6,
    title: "Instant Video Consultations",
    description: "Connect with doctors via secure video call.",
    icon: Video,
    color: "text-pink-500",
  },
  {
    id: 7,
    title: "Easy Payment Options",
    description: "Multiple payment methods for convenience.",
    icon: CreditCard,
    color: "text-teal-500",
  },
  {
    id: 8,
    title: "Health Recovery",
    description: "Track and improve your health outcomes.",
    icon: Activity,
    color: "text-orange-500",
  },
];

export default function OurSolutions() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Our Solutions
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          Explore our services designed to make healthcare easier and more accessible.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {solutions.map((sol) => (
          <Card
            key={sol.id}
            className="p-6 flex flex-col items-center text-center rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 bg-[oklch(0.97_0.05_250_/_0.3)]"
          >
            <sol.icon className={`w-8 h-8 mb-3 ${sol.color}`} />
            <div>
                <h3 className="text-lg pb-1 font-semibold text-gray-900 leading-snug">
              {sol.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{sol.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
