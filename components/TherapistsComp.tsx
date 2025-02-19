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
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    async function fetchTherapists() {
      try {
        const res = await fetch(`/api/therapists`);
        if (!res.ok) {
          throw new Error("Failed to fetch therapists");
        }
        const data = await res.json();
        console.log(data);
        setTherapists(data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
        setError(
          "Error fetching therapists from DB, please restart the server."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTherapists();
  }, []);

  return (
    <div className="flex flex-col md:p-5 justify-center items-center">
      <h1 className="text-4xl font-bold mb-5">Available therapists </h1>
      {/* Show error alert if API call fails */}
      {error ? (
        <div className="text-red-600 text-lg font-semibold p-4 bg-red-100 border border-red-400 rounded-md">
          {error}
        </div>
      ) : loading ? (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col  md:flex-row md:flex-wrap md:gap-4 justify-center items-center">
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
