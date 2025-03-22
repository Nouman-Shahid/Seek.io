import React, { useRef, useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const CourseCards = ({ auth, data = [] }) => {
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
    }, [data]);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -900, behavior: "smooth" });
            setCurrentIndex(Math.max(currentIndex - 1, 0));
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 900, behavior: "smooth" });
            setCurrentIndex(
                Math.min(
                    currentIndex + 1,
                    Math.ceil(data.length / itemsPerPage) - 1
                )
            );
        }
    };

    return (
        <div className="relative w-full p-6 rounded-lg">
            <div className="overflow-hidden relative bg-red-50">
                <div
                    ref={carouselRef}
                    className="flex space-x-10 overflow-x-hidden scroll-smooth scrollbar-hidden p-4 "
                >
                    {data.length > 0 ? (
                        data.map((course) => (
                            <div
                                key={course.id}
                                className="w-[25vw] flex-shrink-0 snap-center p-2"
                            >
                                <div className="w-full  bg-white border border-gray-200 rounded-lg  hover:shadow-xl transition-all duration-300">
                                    <img
                                        className="rounded-t-lg w-full h-60 object-cover"
                                        src={course.course_image}
                                        alt={course.course_title}
                                    />
                                    <div className="p-5 flex flex-col justify-between h-[28vh]">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                            {course.course_title}
                                        </h5>
                                        <p className="mb-3 text-gray-700 flex-grow">
                                            {course.course_desc}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-green-600 font-bold font-sans">
                                                PKR {course.course_amount}
                                            </p>
                                            <Link
                                                href={`/course/id/${course.id}`}
                                                className="px-3 py-2 bg-green-600 text-white rounded-md transition-all duration-300 hover:bg-green-700"
                                            >
                                                View Courses
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
                    onClick={scrollLeft}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full shadow-lg hover:bg-blue-600 transition"
                >
                    <IoIosArrowDropleftCircle className="size-10 bg-white text-blue-500 rounded-full" />
                </button>
            )}
            {canScrollRight && (
                <button
                    onClick={scrollRight}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2  rounded-full shadow-lg hover:bg-blue-600 transition"
                >
                    <IoIosArrowDroprightCircle className="size-10 bg-white text-blue-500 rounded-full" />
                </button>
            )}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({
                    length: Math.max(1, Math.ceil(data.length / itemsPerPage)),
                }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (carouselRef.current) {
                                carouselRef.current.scrollTo({
                                    left: index * 900,
                                    behavior: "smooth",
                                });
                                setCurrentIndex(index);
                            }
                        }}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                            index === currentIndex
                                ? "bg-blue-500 scale-110"
                                : "bg-gray-400 hover:bg-gray-500"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default CourseCards;
