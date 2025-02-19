interface props {
  name: string;
  expertise: string;
  location: string;
  number: string;
}
export default function card({ name, expertise, location, number }: props) {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <div className="bg-black  w-[50vw] md:w-[22vw] text-white flex py-4 px-3 rounded-xl shadow-xl gap-4">
        <div className="bg-white p-2 rounded-full flex items-center justify-center w-12 h-12">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="black"
              strokeWidth="1.5"
              fill="white"
            />
            <path
              d="M4 20c0-4 4-6 8-6s8 2 8 6"
              stroke="black"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
        <div className="w-[0.1vw] bg-white"></div>
        <div className="h-full flex flex-col ">
          <div className="text-xl">{name}</div>
          <div className="text-md">{expertise}</div>
          <div className="text-sm">{location}</div>
          <div className="mt-2 ">{number}</div>
        </div>
      </div>
    </div>
  );
}
{
  /* <li key={therapist.id}>
{therapist.name} - {therapist.expertise} - {therapist.location}
</li> */
}
