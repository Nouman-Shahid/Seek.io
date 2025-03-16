import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, Link } from "@inertiajs/react";
import { IoIosAddCircle } from "react-icons/io";
import CourseCards from "@/Components/CourseCards";
import {
    FaEnvelope,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
} from "react-icons/fa";

const TeacherDashboard = ({ data = {}, auth, course = [] }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-20 flex flex-col lg:flex-row p-6  mx-auto">
                {/* Sidebar */}
                <aside className="w-full lg:w-1/4 max-h-[100vh] bg-gray-100 p-4 rounded-xl shadow-md flex flex-col justify-start items-center text-center">
                    <div type="button">
                        {auth.user.profile_image ? (
                            <img
                                src={auth.user.profile_image}
                                className=" mb-4 w-32 h-32 rounded-full"
                            />
                        ) : (
                            <p className="bg-orange-500 text-white text-6xl mb-4 font-bold w-32 h-32 flex items-center justify-center rounded-full">
                                {auth.user.name.charAt(0)}
                            </p>
                        )}
                    </div>
                    <h2 className="text-xl font-semibold"> {data.name}</h2>
                    <p className="text-gray-600"> {data.profile_headline}</p>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                        Contact
                    </button>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Skills</h3>
                        <p className="text-gray-600">
                            Marketing, Product Management, Business Analytics
                        </p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Languages
                        </h3>
                        <p className="text-gray-600">English - Native</p>
                        <p className="text-gray-600">German - Fluent</p>
                        <p className="text-gray-600">Italian - Fluent</p>
                    </div>

                    <div className="mt-4 flex justify-center space-x-3 text-xl">
                        <FaLinkedin className="text-blue-700 cursor-pointer" />
                        <FaTwitter className="text-blue-400 cursor-pointer" />
                        <FaFacebook className="text-blue-600 cursor-pointer" />
                        <FaInstagram className="text-pink-500 cursor-pointer" />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full lg:w-3/4 p-6">
                    <h1 className="text-2xl font-bold">About me</h1>
                    <p className="text-gray-700 mt-2">
                        {auth.user.profile_about}
                    </p>
                    {/* Experiences */}
                    <h2 className="text-xl font-bold mt-6">Experiences:</h2>
                    <ul className="text-gray-700">
                        <li>
                            Instructor on Seekio{" "}
                            <span className="text-gray-500">
                                (June, 2024 - Present)
                            </span>
                        </li>
                        <li>
                            Product Manager at Microsoft{" "}
                            <span className="text-gray-500">
                                (June, 2023 - 2024)
                            </span>
                        </li>
                        <li>
                            Software Quality Engineer at Motive{" "}
                            <span className="text-gray-500">
                                (Jan, 2020 - 2023)
                            </span>
                        </li>
                    </ul>
                    {/* Education */}
                    <h2 className="text-xl font-bold mt-6">Education:</h2>
                    <ul className="text-gray-700">
                        <li>
                            Bachelors of Data Science from Oxford University{" "}
                            <span className="text-gray-500">
                                (June, 2016 - 2019)
                            </span>
                        </li>
                        <li>
                            Masters in Product Management from Harvard
                            University{" "}
                            <span className="text-gray-500">
                                (June, 2020 - 2022)
                            </span>
                        </li>
                    </ul>
                    {/* My Courses */}
                    <div class="mb-6  flex items-center justify-between">
                        <h2 class="text-xl font-bold mt-6 mb-4">My Courses</h2>{" "}
                        <Link href={`/makecourse`}>
                            <IoIosAddCircle className="size-[5vh] text-blue-600" />
                        </Link>
                    </div>
                    <CourseCards data={course} auth={auth} />
                </main>
            </div>
        </AuthenticatedLayout>
    );
};

export default TeacherDashboard;
