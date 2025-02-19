export default function SkeletonCard() {
    return (
      <div className="flex flex-col justify-center items-center m-4 gap-4">
        <div className="bg-gray-300  w-[50vw] md:w-[22vw] text-white flex py-4 px-3 rounded-xl shadow-xl gap-4 animate-pulse">
          <div className="bg-gray-400 p-2 rounded-full w-12 h-12"></div>
  
          <div className="w-[0.1vw] bg-gray-400"></div>
  
          <div className="h-full flex flex-col">
            <div className="bg-gray-400 h-5 w-32 mb-2 rounded"></div>
            <div className="bg-gray-400 h-4 w-24 mb-2 rounded"></div>
            <div className="bg-gray-400 h-3 w-20 mb-2 rounded"></div>
            <div className="bg-gray-400 h-3 w-16 mt-2 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  