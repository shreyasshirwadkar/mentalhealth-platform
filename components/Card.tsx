// Card.tsx
interface Props {
  name: string;
  expertise: string;
  location: string;
  number: string;
}

export default function Card({ name, expertise, location, number }: Props) {
  return (
    <div className="bg-white w-[80vw] md:w-[260px] p-5 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-out flex flex-col items-center">
      
      {/* Avatar */}
      <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner">
        <span className="text-2xl">🧑‍⚕️</span>
      </div>

      {/* Name */}
      <h2 className="text-lg font-bold text-black text-center">{name}</h2>
      
      {/* Details */}
      <p className="text-sm text-gray-600">{expertise}</p>
      <p className="text-xs text-gray-500">{location}</p>
      <p className="mt-2 text-black font-semibold">{number}</p>

      {/* Action Button */}
      <button className="mt-4 px-4 py-2 text-white bg-gradient-to-br from-blue-400 to-blue-500 rounded-full font-semibold shadow hover:opacity-90 transition">
        Contact
      </button>
    </div>
  );
}
