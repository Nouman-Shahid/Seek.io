import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import Preference from "../images/assets/preference.png";
import Role from "../images/assets/role.png";

const steps = ["Basic Information", "User Details", "User Role"];
const roles = [
    {
        id: 1,
        role: "Student",
        description:
            "Enroll in courses and gain access to high-quality education designed to enhance your skills and knowledge",
    },
    {
        id: 2,
        role: "Teacher",
        description:
            "Join us as a teacher and become a valuable source of knowledge, inspiring and shaping the future of your students",
    },
];
const courses = [
    {
        id: 1,
        title: "Information Technology",
        description:
            "Includes subjects such as web development, data science, cyber security, etc.",
        name: "It",
    },
    {
        id: 2,
        title: "Business",
        description:
            "Includes subjects like Finance, Marketing, Economics, etc.",
        name: "Business",
    },
    {
        id: 3,
        title: "Science",
        description: "Includes subjects like Biology, Chemistry, Physics, etc.",
        name: "Science",
    },
    {
        id: 4,
        title: "Engineering",
        description:
            "Includes subjects like Electrical Engineering, Mechanical Engineering, etc.",
        name: "Engineering",
    },
    {
        id: 5,
        title: "Humanities",
        description:
            "Includes subjects like History, Languages, Philosophy, etc.",
        name: "Humanities",
    },
    {
        id: 6,
        title: "Other",
        description: "Includes other subjects.",
        name: "Other",
    },
];
const UserDetails = () => {
    const [step, setStep] = useState(0);

    const { data, setData, post, errors, processing } = useForm({
        profile_headline: "",
        profile_about: "",
        location: "",
        profile_image: "",
        role: "",
        course: null,
    });

    const nextStep = () =>
        setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const submit = (e) => {
        e.preventDefault();

        if (step === steps.length - 1) {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (Array.isArray(data[key])) {
                    data[key].forEach((item, index) => {
                        Object.keys(item).forEach((field) => {
                            formData.append(
                                `educations[${index}][${field}]`,
                                item[field]
                            );
                        });
                    });
                } else {
                    formData.append(key, data[key]);
                }
            });

            // Debugging: Check what’s inside formData
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]); // This will show if data is missing
            }

            post(route("set_user_details"), {
                data: formData,
                forceFormData: true,
            });
        } else {
            nextStep();
        }
    };

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setData(name, type === "checkbox" ? checked : value);
    };

    useEffect(() => {
        if (!sessionStorage.getItem("userRolePageRefreshed")) {
            sessionStorage.setItem("userRolePageRefreshed", "true");
            window.location.reload();
        }
    }, []);

    return (
        <>
            <div className="flex justify-center w-full items-center min-h-screen bg-gray-100">
                <div className="w-full sm:w-8/12 lg:max-w-6xl p-5 max-h-screen bg-white rounded-lg shadow-lg">
                    {/* Stepper */}
                    <div className="flex justify-between mb-6">
                        {steps.map((label, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-1/4"
                            >
                                <motion.div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                                        index <= step
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-gray-200 text-gray-500 border-gray-300"
                                    }`}
                                >
                                    {index + 1}
                                </motion.div>

                                <span className="text-sm text-gray-700 mt-2">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <motion.form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Step 0: Basic Information */}
                        {step === 0 && (
                            <div className="w-full h-auto min-h-[500px] flex flex-col justify-between p-8 shadow-xl rounded-lg bg-white mx-auto border border-gray-200">
                                <Head title="Basic Information" />
                                <h2 className="text-center text-3xl font-extrabold text-gray-900 my-6">
                                    Setup your Profile
                                </h2>
                                <div className="flex space-x-10">
                                    <div className="space-y-4 w-[65%]">
                                        <div>
                                            <InputLabel
                                                htmlFor="profile_headline"
                                                value="Profile Headline"
                                            />
                                            <TextInput
                                                id="profile_headline"
                                                name="profile_headline"
                                                value={data.profile_headline}
                                                onChange={handleChange}
                                                required
                                                className="w-full mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="location"
                                                value="Address"
                                            />
                                            <TextInput
                                                id="location"
                                                name="location"
                                                value={data.location}
                                                onChange={handleChange}
                                                required
                                                className="w-full mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="profile_about"
                                                value="About"
                                            />
                                            <textarea
                                                id="profile_about"
                                                name="profile_about"
                                                value={data.profile_about}
                                                className="w-full mt-1 border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                                                rows="4"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-[30%]">
                                        <div>
                                            <InputLabel
                                                htmlFor="profile_image"
                                                value="Profile Image (URL)"
                                            />
                                            <TextInput
                                                id="profile_image"
                                                name="profile_image"
                                                value={data.profile_image}
                                                onChange={handleChange}
                                                required
                                                className="w-full mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        {data.profile_image && (
                                            <div className="flex justify-center mt-4">
                                                <img
                                                    src={data.profile_image}
                                                    className="w-32 h-32 object-cover rounded-full border-2 border-blue-500 shadow-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <>
                                <Head title="User Details" />
                                <div>
                                    <div className="w-full h-auto min-h-[500px] flex justify-between p-6 shadow-lg rounded-lg bg-white mx-auto border border-gray-200">
                                        {/* Left Section - Course Selection */}
                                        <div className="flex flex-col w-full md:w-7/12 space-y-6">
                                            <div className="text-center text-3xl font-extrabold text-gray-900 my-6">
                                                Choose Your Preference
                                            </div>

                                            {/* Dropdown for Course Selection */}
                                            <div className="flex flex-col space-y-4">
                                                <label className="text-lg font-semibold text-gray-800">
                                                    Select:
                                                </label>
                                                <select
                                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    name="course"
                                                    value={data.course}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="" selected>
                                                        Select a course
                                                    </option>
                                                    {courses.map((item) => (
                                                        <option
                                                            key={item.id}
                                                            value={item.name}
                                                        >
                                                            {item.title}
                                                        </option>
                                                    ))}
                                                </select>

                                                {data.course && (
                                                    <div className="mt-2 p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                                                        {courses.find(
                                                            (course) =>
                                                                course.name ===
                                                                data.course
                                                        )?.description ||
                                                            "Select from dropdown"}
                                                    </div>
                                                )}

                                                {/* Error Handling */}
                                                {errors.course && (
                                                    <div className="text-red-600 text-sm mt-2 text-center">
                                                        {errors.course}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Section - Image */}
                                        <div className="w-full md:w-5/12 flex justify-center items-center">
                                            <img
                                                src={Preference}
                                                className="w-10/12 object-cover rounded-lg shadow-md opacity-90"
                                                alt="loading"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <Head title="User Role" />
                                <div className="w-full h-auto min-h-[500px] flex justify-between p-6 shadow-lg rounded-lg bg-white mx-auto border border-gray-200">
                                    <div className="flex flex-col w-full md:w-7/12 space-y-6">
                                        <div className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                                            Select Your Role
                                        </div>

                                        {roles.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex flex-col">
                                                    <p className="text-xl font-semibold text-gray-800">
                                                        {item.role}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <input
                                                    type="radio"
                                                    className="w-6 h-6 border-gray-400 text-blue-600 focus:ring-blue-500"
                                                    name="role"
                                                    value={item.role}
                                                    checked={
                                                        data.role === item.role
                                                    }
                                                    required
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        ))}

                                        {errors.role && (
                                            <div className="text-red-600 text-sm mt-2 text-center">
                                                {errors.role}
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full md:w-5/12 flex justify-center items-center">
                                        <img
                                            src={Role}
                                            className="w-80 h-96 object-fit  rounded-lg shadow-md opacity-90"
                                            alt="Role image depicting the different roles of Student and Teacher"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-end mt-6 space-x-5">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-400 py-2 px-6 rounded-md text-white"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="submit"
                                className="bg-blue-600 py-2 px-6 rounded-md text-white"
                                disabled={processing}
                            >
                                {processing
                                    ? "Submitting..."
                                    : step === steps.length - 1
                                    ? "Submit"
                                    : "Next"}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </>
    );
};

export default UserDetails;
