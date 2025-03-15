import CourseCards from "@/Components/CourseCards";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { FaStar } from "react-icons/fa";

const CourseDescription = ({
    data = {},
    auth,
    courses = [],
    // instructor = {},
}) => {
    return (
        // <div className="container mx-auto px-4 py-8">
        //     <div className="flex flex-wrap -mx-4">
        //         <div className="w-full md:w-1/2 px-4 mb-8">
        //             <img
        //                 src={data.course_image}
        //                 alt="Course"
        //                 className="w-full h-auto rounded-lg shadow-md mb-4"
        //                 id="mainImage"
        //             />
        //         </div>

        //         <div className="w-full md:w-1/2 px-4">
        //             <h2 className="text-3xl font-bold mb-2">
        //                 {data.course_title}
        //             </h2>
        //             <p className="text-gray-600 mb-4">SKU: WH100XM4</p>
        //             <div className="mb-4">
        //                 <span className="text-2xl font-bold mr-2">
        //                     PKR {data.course_amount}
        //                 </span>
        //             </div>

        //             <div className="flex items-center mb-4">
        //                 {[...Array(5)].map((_, index) => (
        //                     <svg
        //                         key={index}
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         viewBox="0 0 24 24"
        //                         fill="currentColor"
        //                         className="size-6 text-yellow-500"
        //                     >
        //                         <path
        //                             fillRule="evenodd"
        //                             d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        //                             clipRule="evenodd"
        //                         />
        //                     </svg>
        //                 ))}
        //                 <span className="ml-2 text-gray-600">
        //                     4.5 (120 reviews)
        //                 </span>
        //             </div>

        //             <p className="text-gray-700 mb-6">{data.course_desc}</p>

        //             <div className="mb-6">
        //                 <h3 className="text-lg font-semibold mb-2">
        //                     Category: {data.course_category}
        //                 </h3>
        //             </div>

        //             <div className="mb-6">
        //                 <label className="block text-sm font-medium text-gray-700 mb-1">
        //                     Course duration: {data.course_hours}
        //                 </label>
        //             </div>

        //             {auth.user?.id === data.course_teacher && (
        //                 <div className="flex space-x-4 mb-6">
        //                     <Link
        //                         className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        //                         href={`/course_exam/id/${data.id}`}
        //                     >
        //                         Make Exam
        //                     </Link>
        //                 </div>
        //             )}
        //         </div>
        //     </div>
        // </div>

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
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
                                    Add To Cart
                                </button>
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
                        <p>{data.name}</p>
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
