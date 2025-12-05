import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const StatisticsCard = forwardRef(
  ({ imageSrc, number, description, dataTarget, suffix = "+", buttonText, linkTo }, ref) => {
    return (
      <div
        ref={ref}
        className="group relative rounded-2xl overflow-hidden shadow-xl h-72 sm:h-80 w-full"
      >
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Top decorative element */}
        <div className="absolute top-4 right-4 z-10">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-green-500/80 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/>
              <path d="M12 22V12"/>
              <path d="M8 12c0-3 2-5.5 4-7"/>
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <div className="text-white">
            {/* Number with animated underline */}
            <div className="flex items-baseline gap-1 mb-2">
              <span
                className="text-5xl sm:text-6xl font-black tracking-tight"
                data-target={dataTarget}
              >
                {number}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-green-400">
                {suffix}
              </span>
            </div>

            {/* Animated line */}
            <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-3 group-hover:w-24 transition-all duration-500"></div>

            {/* Description */}
            <p className="text-sm sm:text-base font-medium leading-snug text-white/90 mb-4">
              {description}
            </p>

            {/* Button */}
            {buttonText && linkTo && (
              <Link
                to={linkTo}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs sm:text-sm font-medium py-2 px-4 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                {buttonText}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-transparent rounded-tr-full"></div>
      </div>
    );
  }
);

StatisticsCard.displayName = "StatisticsCard";

export default StatisticsCard;
