import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { IoIosAddCircle } from "react-icons/io";
import CourseCards from "@/Components/CourseCards";
import TextInput from "@/Components/TextInput";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const TeacherDashboard = ({ info = {}, auth, course = [] }) => {
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: auth.user.name,
            profile_headline: auth.user.profile_headline,
            profile_about: auth.user.profile_about,
            profile_image: auth.user.profile_image,
        });

    const submit = (e) => {
        e.preventDefault();

        // patch(route("search"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <form
                onSubmit={submit}
                className="py-10 flex flex-col  p-6 mx-auto"
            >
                <div className="flex justify-end ">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                        {isEditing ? "Save" : "Edit Profile"}
                    </button>
                </div>
                <div className="flex">
                    <aside className="w-full lg:w-1/4 max-h-[100vh] bg-gray-100 p-4 rounded-xl shadow-md flex flex-col justify-start items-center text-center">
                        <div>
                            {isEditing ? (
                                <TextInput
                                    id="profile_image"
                                    className="mt-1 block w-full"
                                    value={data.profile_image}
                                    onChange={(e) =>
                                        setData("profile_image", e.target.value)
                                    }
                                />
                            ) : auth.user.profile_image ? (
                                <img
                                    src={auth.user.profile_image}
                                    className="mb-4 w-32 h-32 rounded-full"
                                />
                            ) : (
                                <p className="bg-orange-500 text-white text-6xl mb-4 font-bold w-32 h-32 flex items-center justify-center rounded-full">
                                    {auth.user.name.charAt(0)}
                                </p>
                            )}
                        </div>

                        {isEditing ? (
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        ) : (
                            <h2 className="text-xl font-bold">{data.name}</h2>
                        )}

                        {isEditing ? (
                            <TextInput
                                id="profile_headline"
                                className="mt-1 block w-full"
                                value={data.profile_headline}
                                onChange={(e) =>
                                    setData("profile_headline", e.target.value)
                                }
                            />
                        ) : (
                            <p className="text-gray-600">
                                {data.profile_headline}
                            </p>
                        )}

                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                            Contact
                        </button>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Skills
                            </h3>
                            <p className="text-gray-600">
                                Marketing, Product Management, Business
                                Analytics
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
                        {isEditing ? (
                            <TextInput
                                id="profile_about"
                                className="mt-1 block w-full"
                                value={data.profile_about}
                                onChange={(e) =>
                                    setData("profile_about", e.target.value)
                                }
                            />
                        ) : (
                            <p className="text-gray-600">
                                {data.profile_about}
                            </p>
                        )}

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
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold mt-6 mb-4">
                                My Courses
                            </h2>{" "}
                            <Link href={`/makecourse`}>
                                <IoIosAddCircle className="size-[5vh] text-blue-600" />
                            </Link>
                        </div>
                        <CourseCards info={course} auth={auth} />
                    </main>
                </div>
                {/* Sidebar */}
            </form>
        </AuthenticatedLayout>
    );
};

export default TeacherDashboard;
