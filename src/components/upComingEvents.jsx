import React from "react";

const sampleEvents = [
    {
        id: 1,
        title: "Summer Music Fest",
        date: "Aug 15, 2025",
        location: "Central Park",
        mainImage: "https://via.placeholder.com/600x400?text=Main+Image+1",
        thumbImage: "https://via.placeholder.com/80?text=Img",
        description: "Join us for an evening of live music featuring local and national acts. Food trucks and family friendly.",
    },
    {
        id: 2,
        title: "Design Workshop",
        date: "Sep 3, 2025",
        location: "Downtown Studio",
        mainImage: "https://via.placeholder.com/600x400?text=Main+Image+2",
        thumbImage: "https://via.placeholder.com/80?text=Img",
        description: "Hands-on session covering modern UI patterns, prototyping, and collaboration tools.",
    },
];


export default function UpComingEvents({ items = sampleEvents }) {
    return (
        <div className="space-y-4">
            {items.map((ev) => (
                <article
                    key={ev.id}
                    className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4 items-start"
                >
                    {/* Left: main image */}
                    <img
                        src={ev.mainImage}
                        alt={ev.title}
                        className="w-full md:w-48 h-40 md:h-40 object-cover rounded"
                    />

                    {/* Right: heading, small top-right image, description, CTA */}
                    <div className="flex-1 relative min-h-[160px]">
                        {/* small top-right thumbnail */}
                        <img
                            src={ev.thumbImage}
                            alt={`${ev.title} thumb`}
                            className="w-14 h-14 rounded-full border-2 border-white shadow absolute right-0 -mt-2"
                        />

                        <div className="pr-4">
                            <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
                            <div className="text-sm text-gray-500">
                                {ev.date} · {ev.location}
                            </div>

                            <p className="mt-3 text-gray-700">{ev.description}</p>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                                Learn more
                            </button>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}