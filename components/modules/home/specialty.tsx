

import { Stethoscope, Brain, Bone, HeartPulse, Baby, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

type Specialty = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  tint: string;
};

const specialties: Specialty[] = [
  {
    id: "1",
    name: "Cardiology",
    description: "Expert care for heart health and cardiovascular treatments.",
    icon: HeartPulse,
    tint: "bg-[oklch(0.95_0.08_250_/_0.4)]",
  },
  {
    id: "2",
    name: "Neurology",
    description: "Advanced treatments for brain and nervous system disorders.",
    icon: Brain,
    tint: "bg-[oklch(0.96_0.07_260_/_0.35)]",
  },
  {
    id: "3",
    name: "Orthopedics",
    description: "Comprehensive care for bones, joints, and muscles.",
    icon: Bone,
    tint: "bg-[oklch(0.97_0.07_200_/_0.35)]",
  },
  {
    id: "4",
    name: "Pediatrics",
    description: "Compassionate care for infants, children, and adolescents.",
    icon: Baby,
    tint: "bg-[oklch(0.97_0.07_120_/_0.3)]",
  },
  {
    id: "5",
    name: "General Medicine",
    description: "Primary care and preventive healthcare for all ages.",
    icon: Stethoscope,
    tint: "bg-[oklch(0.97_0.07_320_/_0.3)]",
  },
  {
    id: "6",
    name: "Ophthalmology",
    description: "Comprehensive eye exams and vision correction.",
    icon: Eye,
    tint: "bg-[oklch(0.96_0.07_240_/_0.35)]",
  },
];

export default function OurSpecialties() {
  const primary = "oklch(0.55 0.2 250)";

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-6xl mx-auto text-center sm:text-left mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Our Specialties
        </h2>
        <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left">
          We provide expert care across a wide range of medical specialties to ensure your well-being.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {specialties.map((sp) => (
          <Card
            key={sp.id}
            className={`p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 text-center ${sp.tint}`}
          >
            <div className="flex flex-col items-center">
              <div
                className="p-4 rounded-full mb-4"
                style={{ background: primary }}
              >
                <sp.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {sp.name}
              </h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                {sp.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
