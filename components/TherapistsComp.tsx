// TherapistsComp.tsx
"use client";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import SkeletonCard from "./SkeletonCard";

interface Therapist {
  id: number;
  name: string;
  expertise: string;
  location: string;
  ph_number: string;
}

export default function TherapistsComp() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTherapists() {
      try {
        const res = await fetch(`/api/therapists`);
        if (!res.ok) throw new Error("Failed to fetch therapists");

        const data = await res.json();
        setTherapists(data);
      } catch (error) {
        setError("⚠️ Could not load therapists. Please restart the server.");
      } finally {
        setLoading(false);
      }
    }
    fetchTherapists();
  }, []);

  return (
    <div className="flex flex-col items-center md:p-6 p-4 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <h1 className="text-4xl font-extrabold text-black mb-6">
        Find Your Therapist 🌿
      </h1>

      {error && (
        <div className="text-red-700 bg-red-100 border border-red-300 px-4 py-3 rounded-xl shadow-sm mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {therapists.map((therapist) => (
            <Card
              key={therapist.id}
              name={therapist.name}
              expertise={therapist.expertise}
              location={therapist.location}
              number={therapist.ph_number}
            />
          ))}
        </div>
      )}
    </div>
  );
}
