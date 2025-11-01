"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, HeartPulse, Star, User } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #155DFC 100%)",
        }}
      />
      {/* Your Content/Components */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* ===== Left Side ===== */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <Badge className="mb-4 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200">
              Your Health, Our Priority
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              Smarter <span className="text-blue-600">Healthcare</span> for a
              Healthier You
            </h1>

            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Discover trusted doctors, read verified reviews, and let our AI
              assistant help you find the best care — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
              <Button className="cursor-pointer" asChild size="lg">
                <Link href="/consultations">Book Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href="/healthplans"
                  className="text-primary cursor-pointer"
                >
                  Book Appointment
                </Link>
              </Button>
            </div>

            {/* ===== Stats ===== */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <User className="text-blue-600 w-5 h-5" />
                  <span className="text-2xl font-bold text-gray-900">
                    1,200+
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Qualified Doctors
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Star className="text-yellow-500 w-5 h-5" />
                  <span className="text-2xl font-bold text-gray-900">
                    4.8/5
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Average Reviews</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <HeartPulse className="text-red-500 w-5 h-5" />
                  <span className="text-2xl font-bold text-gray-900">50k+</span>
                </div>
                <p className="text-sm text-muted-foreground">Happy Patients</p>
              </div>
            </div>
          </div>

          {/* ===== Right Side (AI Suggest Card) ===== */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Card className="w-full max-w-md shadow-lg border border-blue-100">
              <CardHeader className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-xl font-semibold text-blue-600">
                    AI Doctor Suggestion
                  </CardTitle>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Let AI find the best doctor for your symptoms.
                </p>
              </CardHeader>

              <CardContent>
                <form className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="symptom">Describe your symptoms</Label>
                    <Input
                      id="symptom"
                      placeholder="e.g. fever, headache, fatigue..."
                      className="focus-visible:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-500"
                  >
                    Find Doctor
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Our AI will suggest the best specialists based on your
                  symptoms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-50 to-white" />
      </section>
    </div>
  );
}
