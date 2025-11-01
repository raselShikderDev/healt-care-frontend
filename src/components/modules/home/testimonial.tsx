"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Star, StarOff } from "lucide-react";
import { useRef, useEffect, useState } from "react";

type Testimonial = {
  id: string;
  name: string;
  designation: string;
  feedback: string;
  avatar?: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alice Johnson",
    designation: "CEO & Founder",
    feedback:
      "This platform has revolutionized the way we manage projects. It is incredibly user-friendly and efficient.",
    avatar: "/avatars/alice.jpg",
    rating: 5,
  },
  {
    id: "2",
    name: "David Lee",
    designation: "CTO",
    feedback:
      "I have been impressed with the seamless integration and functionality. It has made our tech operations much smoother.",
    avatar: "/avatars/david.jpg",
    rating: 5,
  },
  {
    id: "3",
    name: "Mark Thompson",
    designation: "COO",
    feedback:
      "Managing our day-to-day tasks has never been easier. The interface is intuitive and saves us a lot of time.",
    rating: 3,
  },
  {
    id: "4",
    name: "James Wilson",
    designation: "Developer",
    feedback:
      "I appreciate the robust functionality and simplicity. It has streamlined my workflow considerably.",
    rating: 5,
  },
  {
    id: "5",
    name: "Emma Brown",
    designation: "Designer",
    feedback:
      "Amazing interface and excellent customer support. I highly recommend it to my peers.",
    rating: 4,
  },
  {
    id: "6",
    name: "Liam Smith",
    designation: "Marketing Manager",
    feedback:
      "Our productivity has skyrocketed since we started using this platform.",
    rating: 5,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialCarousel() {
  const primary = "oklch(0.55 0.2 250)";
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardWidth = 360 + 24; // card width + gap (shadow + padding handled by flex gap)

  const next = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTo({
      left: cardWidth * currentIndex,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating)
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      else stars.push(<StarOff key={i} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <p className="text-sm font-medium text-gray-500 flex items-center justify-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" /> Rated 5 stars by 1000+ clients
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Meet our happy clients</h2>
        <p className="text-gray-500">Join a global network of thought leaders, product developers, and more.</p>
      </div>

      {/* Carousel container */}
      <div className="relative max-w-6xl mx-auto px-8 md:px-0">
        {/* Large screen buttons */}
        <button
          onClick={prev}
          className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 z-20"
        >
          &#8592;
        </button>
        <button
          onClick={next}
          className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 z-20"
        >
          &#8594;
        </button>

        {/* Carousel scroll wrapper */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-hidden pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="snap-start flex-shrink-0 w-[calc((100%/3)-16px)] sm:w-[calc((100%/3)-16px)] md:w-[calc((100%/3)-16px)] bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col"
            >
              <div className="flex gap-1 mb-2">{renderStars(t.rating)}</div>
              <p className="text-gray-700 text-sm mb-4 flex-1">{t.feedback}</p>
              <div className="flex items-center gap-3 mt-4">
                <Avatar className="w-10 h-10">
                  {t.avatar ? (
                    <AvatarImage src={t.avatar} alt={t.name} />
                  ) : (
                    <AvatarFallback
                      className="text-white font-semibold text-sm"
                      style={{ background: primary }}
                    >
                      {getInitials(t.name) || <User className="w-4 h-4" />}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-xs text-gray-500">{t.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small screen buttons */}
        <div className="flex justify-center gap-4 mt-4 md:hidden">
          <button
            onClick={prev}
            className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
