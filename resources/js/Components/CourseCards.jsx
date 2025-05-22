import React, { useRef, useMemo } from "react";
import { Link } from "@inertiajs/react";

const CourseCards = ({ auth, data = [], text, flag }) => {
    const filteredData = useMemo(() => {
        let filtered = data;
        if (flag === "Free") {
            filtered = data.filter((course) => course.course_amount === "0");
        }
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 9);
    }, [data, flag]);

    const carouselRef = useRef(null);

    return (
        <div className="relative w-full px-4 md:px-16 py-20">
            {text && (
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-700 mb-6 tracking-tight py-5 text-center md:text-left">
                    {text}
                </h1>
            )}

            <div className="overflow-hidden bg-[#f9fafb] rounded-xl shadow-inner">
                <div
                    ref={carouselRef}
                    className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-6 no-scrollbar"
                >
                    {filteredData.length > 0 ? (
                        filteredData.map((course) => (
                            <div
                                key={course.id}
                                className="flex-shrink-0 w-[85%] sm:w-[300px] snap-center"
                            >
                                <div className="bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 relative h-full flex flex-col justify-between">
                                    <img
                                        className="rounded-t-xl w-full h-48 object-cover"
                                        src={course.course_image}
                                        alt={course.course_title}
                                    />

                                    {auth?.user?.id ===
                                        course.course_teacher && (
                                        <span
                                            className={`absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md ${
                                                course.publish
                                                    ? "bg-green-600"
                                                    : "bg-yellow-500"
                                            }`}
                                        >
                                            {course.publish
                                                ? "Published"
                                                : "Draft"}
                                        </span>
                                    )}

                                    <div className="p-4 flex flex-col justify-between h-[240px]">
                                        <h5 className="text-lg font-semibold text-gray-900">
                                            {course.course_title.length > 50
                                                ? `${course.course_title.slice(
                                                      0,
                                                      50
                                                  )}...`
                                                : course.course_title}
                                        </h5>
                                        <p className="text-sm text-gray-600 flex-grow mt-2">
                                            {course.course_desc.length > 90
                                                ? `${course.course_desc.slice(
                                                      0,
                                                      90
                                                  )}...`
                                                : course.course_desc}
                                        </p>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-md font-semibold text-blue-600">
                                                {course.course_amount === 0
                                                    ? "PKR 0"
                                                    : `PKR ${course.course_amount}`}
                                            </span>
                                            <Link
                                                href={`/course/id/${course.id}`}
                                                className="px-4 py-2 bg-[#1d4ed8] text-white text-sm rounded-md hover:bg-[#2563eb] transition"
                                            >
                                                View Course
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full text-gray-600">
                            No courses available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCards;
