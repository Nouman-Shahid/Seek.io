import React, { useState } from "react";
import { motion } from "framer-motion";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Free from "../images/assets/Free.png";
import Paid from "../images/assets/Paid.png";

const steps = ["Course Information", "Pricing", "Terms & Conditions"];

const MakeCourse = () => {
    const [step, setStep] = useState(0);
    const { data, setData, post, errors, processing } = useForm({
        course_title: "",
        course_desc: "",
        course_category: "",
        course_hours: "",
        course_level: "",
        course_amount: "",
        course_image: null,
        terms_accepted: false,
    });

    const nextStep = () =>
        setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const submit = (e) => {
        e.preventDefault();
        if (step === steps.length - 1) {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key] instanceof File) {
                    formData.append(key, data[key], data[key].name);
                } else if (typeof data[key] === "boolean") {
                    formData.append(key, data[key].toString());
                } else {
                    formData.append(key, data[key]);
                }
            });

            post(route("submit_course"), {
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

    return (
        <AuthenticatedLayout>
            <Head title="Make Course" />
            <div className="flex justify-center w-full items-center min-h-screen  bg-gray-100">
                <div className="w-full sm:w-8/12 lg:max-w-4xl p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between mb-6">
                        {steps.map((label, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-1/4"
                            >
                                <div className="relative flex items-center">
                                    {/* Step Circle */}
                                    <motion.div
                                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all 
                                        ${
                                            index <= step
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-gray-200 text-gray-500 border-gray-300"
                                        }
                                    `}
                                    >
                                        {index + 1}
                                    </motion.div>
                                    {/* Line Between Steps */}
                                    {index < steps.length - 1 && (
                                        <motion.div
                                            className={`absolute top-1/2 right-12 left-12 w-[16.7vw] h-1 transition-all duration-300 
                                            ${
                                                index < step
                                                    ? "bg-blue-500"
                                                    : "bg-gray-300"
                                            }`}
                                        />
                                    )}
                                </div>
                                {/* Step Labels */}
                                <span className="text-sm text-gray-700 mt-2">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <motion.form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {step === 0 && (
                            <div className="flex justify-between items-baseline h-[65vh] shadow-lg p-8 rounded-lg">
                                <div className="flex flex-col w-[55%]">
                                    <div>
                                        <InputLabel
                                            htmlFor="course_title"
                                            value="Course Title"
                                        />
                                        <TextInput
                                            id="course_title"
                                            name="course_title"
                                            value={data.course_title}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            isFocused={true}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError
                                            message={errors.course_title}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex justify-between gap-4 mt-6">
                                        <div className="w-full">
                                            <InputLabel
                                                htmlFor="course_category"
                                                value="Course Category"
                                            />
                                            <select
                                                id="course_category"
                                                name="course_category"
                                                value={data.course_category}
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select course category
                                                </option>
                                                <option value="It">
                                                    Information Technology
                                                </option>
                                                <option value="Business">
                                                    Business
                                                </option>
                                                <option value="Engineering">
                                                    Engineering
                                                </option>
                                                <option value="Science">
                                                    Science
                                                </option>
                                                <option value="Humanities">
                                                    Humanities
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.course_category}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <InputLabel
                                                htmlFor="course_hours"
                                                value="Course Hours"
                                            />
                                            <TextInput
                                                id="course_hours"
                                                type="number"
                                                name="course_hours"
                                                value={data.course_hours}
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                autoComplete="new-password"
                                                onChange={handleChange}
                                                required
                                            />
                                            <InputError
                                                message={errors.course_hours}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="course_desc"
                                            value="Course Description"
                                        />
                                        <textarea
                                            id="course_desc"
                                            name="course_desc"
                                            value={data.course_desc}
                                            className="w-full max-h-24 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError
                                            message={errors.course_desc}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="course_level"
                                            value="Course Level"
                                        />
                                        <select
                                            id="course_level"
                                            name="course_level"
                                            value={data.course_level}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select course level
                                            </option>
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">
                                                Medium
                                            </option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                        <InputError
                                            message={errors.course_level}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className=" flex flex-col  w-[40%]">
                                    <InputLabel
                                        htmlFor="course_image"
                                        value="Course Image Url"
                                    />

                                    <TextInput
                                        id="course_image"
                                        name="course_image"
                                        value={data.course_image}
                                        className="w-full  border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        required
                                    />
                                    <img
                                        src={data.course_image}
                                        className="my-4"
                                    />
                                    <InputError
                                        message={errors.course_image}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="h-[65vh] flex flex-col space-y-8  shadow-lg rounded-lg">
                                <h2 className="text-3xl font-semibold text-gray-800 text-center">
                                    Choose Your Course Pricing
                                </h2>

                                <div className="flex flex-col space-y-6 p-4">
                                    {/* Free Option */}
                                    <div
                                        className={`flex items-center justify-between border-2 rounded-lg p-6 transition-all duration-300 ${
                                            data.course_amount === "0"
                                                ? "border-green-500"
                                                : "border-gray-300"
                                        } hover:border-green-500`}
                                    >
                                        <img
                                            src={Free}
                                            alt="Free"
                                            className="w-28"
                                        />

                                        <div className="flex flex-col flex-grow pl-4">
                                            <p className="text-2xl font-bold text-gray-800">
                                                Free
                                            </p>
                                            <p className="text-gray-600">
                                                Provide free access to your
                                                course content without any
                                                charges.
                                            </p>
                                        </div>

                                        <input
                                            type="radio"
                                            name="course_amount"
                                            value="0"
                                            checked={data.course_amount === "0"}
                                            onChange={() =>
                                                setData("course_amount", "0")
                                            }
                                            className="size-6 accent-green-500 cursor-pointer"
                                        />
                                    </div>

                                    {/* Paid Option */}
                                    <div
                                        className={`flex items-center justify-between border-2 rounded-lg p-6 transition-all duration-300 ${
                                            data.course_amount !== "0"
                                                ? "border-blue-500"
                                                : "border-gray-300"
                                        } hover:border-blue-500`}
                                    >
                                        <img
                                            src={Paid}
                                            alt="Paid"
                                            className="w-28"
                                        />

                                        <div className="flex flex-col flex-grow pl-4">
                                            <p className="text-2xl font-bold text-gray-800">
                                                Paid
                                            </p>
                                            <p className="text-gray-600">
                                                Allow access once payment is
                                                received. Keep pricing
                                                affordable for students.
                                            </p>

                                            <div className="flex items-center space-x-2 mt-3">
                                                <p className="font-bold text-green-600">
                                                    PKR
                                                </p>

                                                <TextInput
                                                    id="course_amount"
                                                    name="course_amount"
                                                    required
                                                    type="number"
                                                    value={
                                                        data.course_amount ===
                                                        "0"
                                                            ? ""
                                                            : data.course_amount
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "course_amount",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-44 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter Amount"
                                                    disabled={
                                                        data.course_amount ===
                                                        "0"
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.course_amount
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <input
                                            type="radio"
                                            name="course_amount"
                                            value={
                                                data.course_amount === "0"
                                                    ? ""
                                                    : data.course_amount
                                            }
                                            checked={data.course_amount !== "0"}
                                            onChange={() =>
                                                setData("course_amount", "")
                                            }
                                            className="size-6 accent-blue-500 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="h-[65vh] flex flex-col justify-between p-6 bg-white shadow-lg rounded-lg">
                                {/* Title */}
                                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                                    Terms & Conditions
                                </h2>

                                {/* Terms & Conditions Content */}
                                <div className="bg-gray-100 p-6 rounded-md shadow-sm border border-gray-300 max-h-52 overflow-y-auto">
                                    <p className="text-gray-700 leading-relaxed">
                                        By publishing a course on this platform,
                                        you agree to adhere to our content
                                        guidelines, ensuring your course
                                        provides high-quality and educational
                                        value to students. You are responsible
                                        for maintaining the course, responding
                                        to student queries, and ensuring all
                                        materials comply with copyright laws and
                                        platform standards.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mt-4">
                                        If your course is paid, you acknowledge
                                        that transactions will be securely
                                        processed via our payment gateway.
                                        Refund policies apply as per platform
                                        regulations, and any disputes should be
                                        handled professionally. Violation of
                                        these terms may result in course removal
                                        or account suspension.
                                    </p>
                                </div>

                                {/* Checkbox Section */}
                                <div className="flex items-center justify-center space-x-3 mt-6">
                                    <input
                                        type="checkbox"
                                        name="terms_accepted"
                                        checked={data.terms_accepted}
                                        onChange={handleChange}
                                        className="w-5 h-5 accent-green-600 border border-gray-400 rounded cursor-pointer"
                                    />
                                    <span className="text-gray-800 text-lg">
                                        I confirm that I have read and accept
                                        the terms and conditions and privacy
                                        policy.
                                    </span>
                                </div>

                                {/* Error Message */}
                                {errors.terms_accepted && (
                                    <p className="text-red-500 text-sm mt-2 text-center">
                                        {errors.terms_accepted}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex justify-between mt-6">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-400 py-2 px-6 rounded-md text-white "
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="submit"
                                className="text-center bg-blue-600 py-2 px-6 rounded-md text-white font-bold active:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
        </AuthenticatedLayout>
    );
};

export default MakeCourse;
