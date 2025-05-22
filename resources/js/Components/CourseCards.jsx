import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "@inertiajs/react";
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from "react-icons/io";

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
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    useEffect(() => {
        const updateScrollButtons = () => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } =
                    carouselRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
            }
        };
        updateScrollButtons();
        carouselRef.current?.addEventListener("scroll", updateScrollButtons);
        return () =>
            carouselRef.current?.removeEventListener(
                "scroll",
                updateScrollButtons
            );
    }, [filteredData]);

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({ left: -900, behavior: "smooth" });
        setCurrentIndex(Math.max(currentIndex - 1, 0));
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({ left: 900, behavior: "smooth" });
        setCurrentIndex(
            Math.min(
                currentIndex + 1,
                Math.ceil(filteredData.length / itemsPerPage) - 1
            )
        );
    };

    return (
        <div className="relative w-full h-[110vh] p-16 shadow-xl">
            {text && (
                <h1 className="text-4xl font-extrabold text-gray-700 mb-6 tracking-tight py-5">
                    {text}
                </h1>
            )}
            <div className="overflow-hidden bg-[#f9fafb] rounded-xl shadow-inner">
                <div
                    ref={carouselRef}
                    className="flex space-x-6 overflow-x-hidden scroll-smooth scrollbar-hidden p-4"
                >
                    {filteredData.length > 0 ? (
                        filteredData.map((course) => (
                            <div
                                key={course.id}
                                className="w-[300px] flex-shrink-0 snap-center p-2"
                            >
                                <div className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 relative">
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

            {canScrollLeft && (
                <button
                    type="button"
                    onClick={scrollLeft}
                    className="absolute top-1/2 left-10 transform -translate-y-1/2 rounded-full transition hover:scale-105"
                >
                    <IoIosArrowDropleftCircle className="size-10 text-blue-600 bg-white rounded-full shadow-lg" />
                </button>
            )}
            {canScrollRight && (
                <button
                    type="button"
                    onClick={scrollRight}
                    className="absolute top-1/2 right-10 transform -translate-y-1/2 rounded-full transition hover:scale-105"
                >
                    <IoIosArrowDroprightCircle className="size-10 text-blue-600 bg-white rounded-full shadow-lg" />
                </button>
            )}

            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({
                    length: Math.max(
                        1,
                        Math.ceil(filteredData.length / itemsPerPage)
                    ),
                }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            carouselRef.current?.scrollTo({
                                left: index * 900,
                                behavior: "smooth",
                            });
                            setCurrentIndex(index);
                        }}
                        className={`h-3 w-3 rounded-full ${
                            index === currentIndex
                                ? "bg-blue-600 scale-110"
                                : "bg-gray-400 hover:bg-gray-500"
                        } transition-all duration-300`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default CourseCards;
