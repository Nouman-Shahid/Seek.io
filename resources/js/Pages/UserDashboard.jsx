import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { IoIosAddCircle } from "react-icons/io";
import CourseCards from "@/Components/CourseCards";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Navbar from "@/Components/Navbar";
import { ToastContainer, toast } from "react-toastify";

const TeacherDashboard = ({
    user = {},
    auth,
    coursesAsTeacher = [],
    coursesAsStudent = [],
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        profile_headline: user.profile_headline,
        profile_about: user.profile_about,
        profile_image: user.profile_image,
        address: user.address,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("user_details_update"));
    };

    const notify = () => {
        setTimeout(() => {
            toast(" ☑️ Profile Saved Successfully", {
                style: {
                    backgroundColor: "#576eff",
                    color: "#ffffff",
                },
                progressClassName: "custom-progress", //class is in app.css file
            });
        }, 2000);
    };

    return (
        <>
            <Head title="User Dashboard" />
            <Navbar auth={auth} />
            <ToastContainer />

            <form
                onSubmit={submit}
                className="py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8"
            >
                {/* Edit/Save Buttons */}
                <div className="flex justify-end space-x-3">
                    {isEditing ? (
                        <>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition-all"
                                disabled={processing}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    submit(e);
                                    setIsEditing(false);
                                    notify();
                                }}
                                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all"
                                disabled={processing}
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white transition-all"
                            disabled={processing}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-[30%]  shadow-xl h-fit p-6 rounded-2xl space-y-6 text-center">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center">
                            {isEditing ? (
                                <>
                                    <label className="w-full text-left font-semibold text-gray-700 mb-1">
                                        Image URL
                                    </label>
                                    <TextInput
                                        id="profile_image"
                                        className="w-full"
                                        value={data.profile_image}
                                        onChange={(e) =>
                                            setData(
                                                "profile_image",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.profile_image}
                                    />
                                </>
                            ) : auth.user.profile_image ? (
                                <img
                                    src={auth.user.profile_image}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                                />
                            ) : (
                                <div className="bg-orange-500 text-white text-5xl font-bold w-28 h-28 flex items-center justify-center rounded-full shadow-lg">
                                    {auth.user.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Name */}
                        <div className="space-y-1">
                            <label className="hidden">Name</label>
                            {isEditing ? (
                                <>
                                    <TextInput
                                        id="name"
                                        className="w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.name}
                                    />
                                </>
                            ) : (
                                <h2 className="text-xl font-bold text-gray-800">
                                    {data.name}
                                </h2>
                            )}
                        </div>

                        {/* Address */}
                        <div className="space-y-1">
                            {isEditing ? (
                                <>
                                    <label className="w-full text-left font-semibold text-gray-700">
                                        Address
                                    </label>
                                    <TextInput
                                        id="address"
                                        className="w-full"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.address}
                                    />
                                </>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    {data.address}
                                </p>
                            )}
                        </div>

                        {/* Headline */}
                        <div className="space-y-1">
                            {isEditing ? (
                                <>
                                    <label className="w-full text-left font-semibold text-gray-700">
                                        Headline
                                    </label>
                                    <TextInput
                                        id="profile_headline"
                                        className="w-full"
                                        value={data.profile_headline}
                                        onChange={(e) =>
                                            setData(
                                                "profile_headline",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.profile_headline}
                                    />
                                </>
                            ) : (
                                <p className="text-gray-500 italic">
                                    {data.profile_headline}
                                </p>
                            )}
                        </div>

                        {/* Contact / Payout */}
                        <div className="space-y-3 w-full flex items-center justify-center">
                            {auth.user.id !== user.id && (
                                <a
                                    href={`mailto:${user.email}`}
                                    className="block lg:w-full w-3/4 px-2 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center transition-all"
                                >
                                    Contact
                                </a>
                            )}
                            {auth.user.role === "Teacher" && (
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
                            {isEditing ? (
                                <>
                                    <textarea
                                        id="profile_about"
                                        className="w-full min-h-[200px] p-3 rounded-lg border border-gray-300 focus:outline-blue-500"
                                        value={data.profile_about}
                                        onChange={(e) =>
                                            setData(
                                                "profile_about",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.profile_about}
                                    />
                                </>
                            ) : (
                                <p className="text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
                                    {data.profile_about}
                                </p>
                            )}
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
                                    <Link
                                        href="/makecourse"
                                        className="bg-blue-600 text-white rounded-md py-1 px-3 hover:bg-blue-700"
                                    >
                                        Add Course
                                    </Link>
                                )}
                            </div>

                            <CourseCards
                                data={
                                    user.role === "Teacher"
                                        ? coursesAsTeacher
                                        : coursesAsStudent
                                }
                                auth={auth}
                            />
                        </section>
                    </main>
                </div>
            </form>
        </>
    );
};

export default TeacherDashboard;
