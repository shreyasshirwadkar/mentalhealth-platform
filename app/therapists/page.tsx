import TherapistsComp from "@/components/TherapistsComp";
async function getTherapists() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/therapists`);

  if (!res.ok) {
    throw new Error("Failed to fetch therapists");
  }

  return res.json();
}

export default async function Page() {
  const therapists = await getTherapists();

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4 ml-5">Available Therapists</h1>
      <TherapistsComp therapists={therapists} />
    </div>
  );
}
