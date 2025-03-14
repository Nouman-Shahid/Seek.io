import { Link } from "@inertiajs/react";
import React from "react";

const CourseDescription = ({ data = {}, auth }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-8">
                    <img
                        src={data.course_image}
                        alt="Course"
                        className="w-full h-auto rounded-lg shadow-md mb-4"
                        id="mainImage"
                    />
                </div>

                <div className="w-full md:w-1/2 px-4">
                    <h2 className="text-3xl font-bold mb-2">
                        {data.course_title}
                    </h2>
                    <p className="text-gray-600 mb-4">SKU: WH100XM4</p>
                    <div className="mb-4">
                        <span className="text-2xl font-bold mr-2">
                            PKR {data.course_amount}
                        </span>
                    </div>

                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 text-yellow-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                        <span className="ml-2 text-gray-600">
                            4.5 (120 reviews)
                        </span>
                    </div>

                    <p className="text-gray-700 mb-6">{data.course_desc}</p>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                            Category: {data.course_category}
                        </h3>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Course duration: {data.course_hours}
                        </label>
                    </div>

                    {auth.user?.id === data.course_teacher && (
                        <div className="flex space-x-4 mb-6">
                            <Link
                                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                href={`/course_exam/id/${data.id}`}
                            >
                                Make Exam
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDescription;
