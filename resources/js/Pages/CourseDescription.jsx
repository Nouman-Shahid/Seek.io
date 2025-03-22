import CourseCards from "@/Components/CourseCards";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { FaStar } from "react-icons/fa";

const CourseDescription = ({ data = {}, auth, courses = [] }) => {
    return (
        <AuthenticatedLayout>
            <div className="pt-20 max-w-6xl mx-auto p-4">
                {/* Course Header */}
                <div className="bg-blue-100 p-6 rounded-xl flex flex-col lg:flex-row items-center gap-6">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {data.course_title}
                        </h1>
                        <p className="text-gray-600 mt-2">{data.course_desc}</p>
                        <div className="mt-4 flex gap-4">
                            <span className="text-green-600 font-bold text-xl">
                                PKR {data.course_amount}
                            </span>
                            {auth.user.role === "Student" ? (
                                <>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                                        Enroll Now
                                    </button>
                                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
                                        Add To Cart
                                    </button>
                                </>
                            ) : (
                                <>
                                    {auth.user?.id === data.course_teacher && (
                                        <div className="flex space-x-4 mb-6">
                                            <Link
                                                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                href={`/course_exam/id/${data.id}`}
                                            >
                                                Make Exam
                                            </Link>
                                        </div>
                                    )}{" "}
                                </>
                            )}
                        </div>
                    </div>
                    <img
                        src={data.course_image}
                        alt="Course"
                        className="w-80 h-64 rounded-[50px] object-fill"
                    />
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="font-bold">Instructor:</p>
                        <a href="">{data.name}</a>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="font-bold">Skill Level:</p>
                        <p>{data.course_level}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="font-bold">Time to Complete:</p>
                        <p>{data.course_hours} hours</p>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold">Learner Reviews</h2>
                    <div className="flex items-center mt-2">
                        <span className="text-2xl font-bold">
                            {data.course_rating}
                        </span>
                        <div className="flex text-yellow-500 ml-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={
                                        i < data.course_rating
                                            ? "text-yellow-500"
                                            : "text-gray-400"
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    {/* Individual Reviews */}
                    <div className="mt-4 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-bold">Anonymous User</p>
                            <p className="text-gray-600">
                                This course made me understand all concepts
                                easily.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-bold">Anonymous User</p>
                            <p className="text-gray-600">
                                A great investment. I learned a lot from it.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Courses */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold">Related Courses</h2>
                    <CourseCards data={courses} auth={auth} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CourseDescription;
