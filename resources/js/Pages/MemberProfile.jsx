import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CourseCards from "@/Components/CourseCards";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

const MemberProfile = ({ user = {}, data = [], auth }) => {
    return (
        <>
            <Head title="Profile" />
            <Navbar auth={auth} />

            <div className="py-10 flex flex-col  p-6 mx-auto">
                <div className="flex">
                    <aside className="w-full lg:w-1/4 max-h-[100vh] bg-gray-100 p-4 rounded-xl shadow-md flex flex-col justify-between items-center text-center">
                        <div className="flex-col flex w-full items-center">
                            {user.profile_image ? (
                                <img
                                    src={user.profile_image}
                                    className="mb-4 w-32 h-32 rounded-full"
                                />
                            ) : (
                                <p className="bg-orange-500 text-white text-6xl mb-4 font-bold w-32 h-32 flex items-center justify-center rounded-full">
                                    {user.name.charAt(0)}
                                </p>
                            )}

                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-gray-600">{user.address}</p>

                            <p className="text-gray-600">
                                {user.profile_headline}
                            </p>
                        </div>

                        <a
                            href={`mailto:${user.email}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full text-center block"
                        >
                            Contact
                        </a>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4 p-6 ">
                        <h1 className="text-2xl font-bold ">About me</h1>

                        <pre className="text-gray-600 whitespace-pre-wrap break-words font-sans">
                            {user.profile_about}
                        </pre>

                        {user.role === "Teacher" ? (
                            <>
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-bold mt-6 mb-4">
                                        My Courses
                                    </h2>{" "}
                                </div>
                                <CourseCards data={data} auth={auth} />
                            </>
                        ) : (
                            <>
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-bold mt-6 mb-4">
                                        Enrolled Courses
                                    </h2>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default MemberProfile;
