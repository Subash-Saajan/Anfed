import React, { forwardRef } from "react";

const StatisticsCard = forwardRef(
  ({ imageSrc, number, description, dataTarget }, ref) => {
    return (
      <div
        ref={ref}
        className="relative rounded-xl overflow-hidden shadow-lg h-110 w-full group">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${imageSrc})` }}
        />

        {/* Text Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <div className="text-white">
            <div
              className="text-4xl sm:text-5xl font-bold mb-2"
              data-target={dataTarget}>
              {number}
            </div>
            <p className="text-xl font-medium sm:text-base leading-tight">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

StatisticsCard.displayName = "StatisticsCard";

export default StatisticsCard;
