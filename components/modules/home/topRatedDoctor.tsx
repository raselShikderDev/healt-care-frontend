import { Star, MapPin, Phone, User } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Doctor = {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    location: string;
    phone: string;
    avatar?: string;
};

const doctors: Doctor[] = [
    {
        id: "1",
        name: "Dr. Ayesha Khan",
        specialty: "Cardiologist",
        rating: 4.9,
        reviews: 240,
        location: "Dhaka, Bangladesh",
        phone: "+880 1X-XXXX-XXXX",
        // avatar: "/avatars/ayesha.jpg",
    },
    {
        id: "2",
        name: "Dr. Tariq Rahman",
        specialty: "Orthopedic Surgeon",
        rating: 4.8,
        reviews: 190,
        location: "Gulshan, Dhaka",
        phone: "+880 1X-XXXX-XXXX",
    },
    {
        id: "3",
        name: "Dr. Lina Sultana",
        specialty: "Pediatrician",
        rating: 4.7,
        reviews: 160,
        location: "Dhanmondi, Dhaka",
        phone: "+880 1X-XXXX-XXXX",
    },
];

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export default function TopRatedDoctors() {
    const primary = "oklch(0.55 0.2 250)";

    return (
        <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center sm:text-left mb-12">
                <h2 className="text-3xl  font-semibold mb-2 text-gray-900">
                    Top Rated Doctors
                </h2>
                <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left ">
                    Meet our top-rated specialists who provide trusted, compassionate, and exceptional healthcare.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {doctors.map((doc) => (
                    <Card
                        key={doc.id}
                        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
                    >
                        {/* Avatar */}
                        <Avatar className="w-20 h-20 mb-4">
                            {doc.avatar ? (
                                <AvatarImage src={doc.avatar} alt={doc.name} />
                            ) : (
                                <AvatarFallback
                                    className="text-white font-semibold text-lg"
                                    style={{ background: primary }}
                                >
                                    {getInitials(doc.name) || <User className="w-6 h-6" />}
                                </AvatarFallback>
                            )}
                        </Avatar>

                        {/* Info */}
                        <h3 className="text-lg font-medium text-gray-900">
                            {doc.name}
                        </h3>
                        <p className="text-sm text-blue-400">{doc.specialty}</p>

                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1 mt-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium text-gray-800">
                                {doc.rating}
                            </span>
                            <span className="text-xs text-gray-500">
                                ({doc.reviews})
                            </span>
                        </div>

                        {/* Location & Contact */}
                        <div className="mt-4 text-sm text-gray-500 space-y-1">
                            <div className="flex items-center justify-center gap-2">
                                <MapPin className="w-4 h-4 text-[oklch(0.55_0.2_250)]" />
                                <span>{doc.location}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4 text-[oklch(0.55_0.2_250)]" />
                                <span>{doc.phone}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                className="border text-[oklch(0.55_0.2_250)] border-[oklch(0.55_0.2_250)] hover:bg-[oklch(0.96_0.05_250)] transition-colors"
                            >
                                Book Now
                            </Button>
                            <Button
                                className="text-white hover:opacity-90 transition-opacity"
                                style={{ background: primary }}
                            >
                                Contact
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-12">
                <Button
                    className="text-white px-8 py-5 text-base font-medium rounded-full hover:opacity-90 transition-opacity"
                    style={{ background: primary }}
                >
                    View All Doctors
                </Button>
            </div>
        </section>
    );
}
