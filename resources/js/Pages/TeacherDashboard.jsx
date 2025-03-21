import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { IoIosAddCircle } from "react-icons/io";
import CourseCards from "@/Components/CourseCards";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

const TeacherDashboard = ({ info = {}, auth, course = [] }) => {
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, patch, errors, processing } = useForm({
        name: auth.user.name,
        profile_headline: info.profile_headline,
        profile_about: info.profile_about,
        profile_image: info.profile_image,
        address: info.address,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("user_details_update"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <form
                onSubmit={submit}
                className="py-10 flex flex-col  p-6 mx-auto"
            >
                <div className="flex justify-end">
                    {isEditing ? (
                        <button
                            type="submit" // Ensure it's a submit button
                            onClick={(e) => {
                                e.preventDefault(); // Prevent unwanted form submission
                                submit(e); // Send data to backend
                                setIsEditing(false); // Switch back to "Edit" mode
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                            disabled={processing}
                        >
                            Save
                        </button>
                    ) : (
                        <div
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 cursor-pointer"
                            disabled={processing}
                        >
                            Edit Profile
                        </div>
                    )}
                </div>

                <div className="flex">
                    <aside className="w-full lg:w-1/4 max-h-[100vh] bg-gray-100 p-4 rounded-xl shadow-md flex flex-col justify-between items-center text-center">
                        <div className="flex-col flex w-full items-center">
                            {isEditing ? (
                                <>
                                    <label className=" w-full text-left font-bold">
                                        Image (URL):
                                    </label>

                                    <TextInput
                                        id="profile_image"
                                        className="mt-1 block w-full"
                                        value={data.profile_image}
                                        onChange={(e) =>
                                            setData(
                                                "profile_image",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.profile_image}
                                    />
                                </>
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

                            {isEditing ? (
                                <>
                                    <label className=" w-full text-left font-bold">
                                        Name:
                                    </label>
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </>
                            ) : (
                                <h2 className="text-xl font-bold">
                                    {data.name}
                                </h2>
                            )}

                            {isEditing ? (
                                <>
                                    <label className=" w-full text-left font-bold">
                                        Address:
                                    </label>
                                    <TextInput
                                        id="address"
                                        className="mt-1 block w-full"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.address}
                                    />
                                </>
                            ) : (
                                <p className="text-gray-600">{data.address}</p>
                            )}

                            {isEditing ? (
                                <>
                                    <label className=" w-full text-left font-bold">
                                        Headline:
                                    </label>
                                    <TextInput
                                        id="profile_headline"
                                        className="mt-1 block w-full"
                                        value={data.profile_headline}
                                        onChange={(e) =>
                                            setData(
                                                "profile_headline",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.profile_headline}
                                    />
                                </>
                            ) : (
                                <p className="text-gray-600">
                                    {data.profile_headline}
                                </p>
                            )}
                        </div>

                        <a
                            href={`mailto:${info.email}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full text-center block"
                        >
                            Contact
                        </a>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4 p-6 ">
                        <h1 className="text-2xl font-bold ">About me</h1>
                        {isEditing ? (
                            <>
                                <textarea
                                    id="profile_about"
                                    className="mt-1 block w-full min-h-[40vh]"
                                    value={data.profile_about}
                                    onChange={(e) =>
                                        setData("profile_about", e.target.value)
                                    }
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.profile_about}
                                />
                            </>
                        ) : (
                            <p className="text-gray-600">
                                {data.profile_about}
                            </p>
                        )}

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
