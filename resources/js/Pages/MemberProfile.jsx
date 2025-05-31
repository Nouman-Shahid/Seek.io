import React from "react";
import { Head, Link } from "@inertiajs/react";
import CourseCards from "@/Components/CourseCards";
import Navbar from "@/Components/Navbar";
import { IoIosAddCircle } from "react-icons/io";

const MemberProfile = ({ user = {}, data = [], auth }) => {
    return (
        <>
            <Head title="Profile" />
            <Navbar auth={auth} />

            <div className="py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
                {/* Profile Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full shadow-xl h-fit p-6 rounded-2xl space-y-6 text-center">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center">
                            {user.profile_image ? (
                                <img
                                    src={user.profile_image}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                                />
                            ) : (
                                <div className="bg-orange-500 text-white text-5xl font-bold w-28 h-28 flex items-center justify-center rounded-full shadow-lg">
                                    {user.name?.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Name */}
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-800">
                                {user.name}
                            </h2>
                        </div>

                        {/* Address */}
                        <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                                {user.address}
                            </p>
                        </div>

                        {/* Headline */}
                        <div className="space-y-1">
                            <p className="text-gray-500 italic">
                                {user.profile_headline}
                            </p>
                        </div>

                        {/* Contact / Payout */}
                        <div className="space-y-3 w-full flex items-center justify-center">
                            {auth.user?.id !== user.id && (
                                <a
                                    href={`mailto:${user.email}`}
                                    className="block lg:w-full w-3/4 px-2 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center transition-all"
                                >
                                    Contact
                                </a>
                            )}
                            {auth.user?.role === "Teacher" && (
                                <Link
                                    href={`/payout_&_earnings/id/${auth.user.id}`}
                                    className="block lg:w-full w-3/4 px-2 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center transition-all"
                                >
                                    Payouts & Earnings
                                </Link>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4 bg-white p-6 rounded-2xl shadow-xl space-y-8">
                        <section>
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                About Me
                            </h1>
                            <p className="text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
                                {user.profile_about}
                            </p>
                        </section>

                        {/* Courses */}
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {user.role === "Teacher"
                                        ? "My Courses"
                                        : "Enrolled Courses"}
                                </h2>
                                {user.role === "Teacher" && (
                                    <Link href="/makecourse">
                                        <IoIosAddCircle className="text-blue-600 hover:text-blue-700 text-3xl" />
                                    </Link>
                                )}
                            </div>

                            <CourseCards data={data} auth={auth} />
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
};

export default MemberProfile;
