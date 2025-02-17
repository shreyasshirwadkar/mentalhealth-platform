"use client";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import SkeletonCard from "./SkeletonCard";

interface Therapist {
  id: number;
  name: string;
  expertise: string;
  location: string;
  number: string;
}

export default function TherapistsComp({
  therapists,
}: {
  therapists: Therapist[];
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000); // Simulate delay
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : therapists.map((therapist) => (
            <Card
              key={therapist.id}
              name={therapist.name}
              expertise={therapist.expertise}
              location={therapist.location}
              number={therapist.number}
            />
          ))}
    </div>
  );
}
