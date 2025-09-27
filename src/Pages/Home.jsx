import bgImage from "../assets/banner.jpg"; 
import UpComingEvents from "../components/upComingEvents";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="m-7">
      <div className="relative w-full h-80 rounded-xl overflow-hidden hero-hover ">
        <img
          src={bgImage}
          alt="card image"
          className="w-full h-fit object-cover cinematic-pan"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000aa] via-[#01010150] to-[#FFFFFF00]"></div>

        <div className="absolute top-5 left-10 text-white">
          <p className="text-2xl italic font-thin">Soil to Soul</p>
        </div>

        <div className="absolute bottom-20 left-10 text-white">
          <h2 className="text-4xl font-bold">
            Anuman Nadhi Fed <br />
            Producer Company Ltd
          </h2>
        </div>

        <div className="absolute bottom-6 left-10">
          <button className="bg-white text-black text-md font-bold py-2 px-6 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            About us
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <section className="mt-10 ml-3 mr-3">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <span className="h-[6px] w-12 bg-green-700"></span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-green-700 tracking-wide">
              Overview
            </h3>
          </div>
          <p className="mt-2 text-sm sm:text-base font-medium text-gray-800">
            Overview title goes here
          </p>
          <div className="mt-1 text-[12px] sm:text-sm text-gray-700 leading-relaxed font-medium">
            <p className="mt-1">
              overview paragraph goes here overview paragraph goes here overview
              paragraph goes here
            </p>
            <p className="mt-1">
              overview paragraph goes here overview paragraph goes here
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-7 justify-center justify-items-center">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="relative rounded-xl bg-white p-10 shadow-xl card-cinematic">
              <div className="absolute -top-4 left-6 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center">
                <div className="h-7 w-7 rounded-full border-4 border-green-700 flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-700 block"></span>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="text-xl sm:text-base font-bold text-gray-800">
                  Who we are.
                </h4>
                <p className="mt-2 text-[11px] font-bold sm:text-[12px] text-gray-600 leading-relaxed">
                  Anuman River basin of the Western Ghats, our journey began
                  with the revival of Hanumanathi (Anuman Nadhi) — lifeline for
                  farmers across Radhapuram Taluk in Tirunelveli District.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="mt-15 ml-3 mr-3">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[6px] w-12 bg-[#448800]"></span>
          <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#448800] tracking-wide">
            Upcoming Events
          </h3>
        </div>
        <UpComingEvents />
      </section>
    </div>
  );
}
