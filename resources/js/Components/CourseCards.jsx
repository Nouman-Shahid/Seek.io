import React from "react";
import { Link } from "@inertiajs/react";

const CourseCards = ({ auth, data = [] }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-center items-center my-16">
            {data.length > 0 ? (
                data.map((course) => (
                    <div
                        key={course.id}
                        className="w-96 h-[65vh] bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col"
                    >
                        <img
                            className="rounded-t-lg w-full h-60 object-cover"
                            src={course.course_image}
                            alt={course.course_title}
                        />
                        <div className="p-5 flex flex-col justify-between h-full">
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
                                {!auth.user || auth.user.role === "Student" ? (
                                    <Link
                                        href={route("login")}
                                        className="px-3 py-2 bg-green-600 text-white rounded-md transition-all duration-300 hover:bg-green-700"
                                    >
                                        Enroll Courses
                                    </Link>
                                ) : auth.user &&
                                  auth.user.role === "Teacher" ? (
                                    <Link
                                        href={`/course/id/${course.id}`}
                                        className="px-3 py-2 bg-green-600 text-white rounded-md transition-all duration-300 hover:bg-green-700"
                                    >
                                        View Courses
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center w-full">No courses available.</p>
            )}
        </div>
    );
};

export default CourseCards;
