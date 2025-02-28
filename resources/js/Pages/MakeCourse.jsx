import React, { useState } from "react";
import { motion } from "framer-motion";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const steps = [
    "Course Information",
    "Course Content",
    "Pricing",
    "Terms & Conditions",
];

const MakeCourse = () => {
    const [step, setStep] = useState(0);
    const { data, setData, post, errors } = useForm({
        course_title: "",
        course_desc: "",
        course_category: "",
        course_hours: "",
        course_level: "",
        course_amount: "free",
        course_image: null, // Use null for file inputs
        content_media: null, // Use null for file inputs
        module_name: "",
        content_desc: "",
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
                    formData.append(key, data[key], data[key].name); // ✅ Fix file upload issue
                } else if (typeof data[key] === "boolean") {
                    formData.append(key, data[key].toString()); // ✅ Fix checkbox value issue
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

        if (type === "checkbox") {
            setData(name, checked);
        } else {
            setData(name, value);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="flex justify-center w-full items-center min-h-screen  bg-gray-100">
                <div className="w-full sm:w-8/12 lg:max-w-4xl p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between mb-6">
                        {steps.map((label, index) => (
                            <div
                                key={index}
                                className={`w-8  h-8 flex items-center justify-center rounded-full ${
                                    index <= step
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 text-gray-600"
                                }`}
                            >
                                {index + 1}
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
                            <div className="flex justify-between items-baseline">
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
                                                <option value="IT">
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
                                            className="w-full min-h-36 max-h-36 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
                                            <option value="easy">Easy</option>
                                            <option value="medium">
                                                Medium
                                            </option>
                                            <option value="hard">Hard</option>
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
                            <div className="flex justify-between items-baseline">
                                <div className="flex flex-col w-[55%]">
                                    <div>
                                        <InputLabel
                                            htmlFor="module_name"
                                            value="Module Name"
                                        />
                                        <TextInput
                                            id="module_name"
                                            name="module_name"
                                            value={data.module_name}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            isFocused={true}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError
                                            message={errors.module_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="content_desc"
                                            value="Course Content"
                                        />
                                        <textarea
                                            id="content_desc"
                                            name="content_desc"
                                            value={data.content_desc}
                                            className="w-full min-h-36 max-h-36 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError
                                            message={errors.content_desc}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className=" flex flex-col  w-[40%]">
                                    <InputLabel
                                        htmlFor="content_media"
                                        value="Content Media Url"
                                    />
                                    <TextInput
                                        id="content_media"
                                        name="content_media"
                                        value={data.content_media}
                                        className="w-full  border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        required
                                    />
                                    <img
                                        src={data.content_media}
                                        className="my-4"
                                    />{" "}
                                    <InputError
                                        message={errors.content_media}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <InputLabel value="Pricing" />
                                <div className="flex gap-4">
                                    <label>
                                        <input
                                            type="radio"
                                            name="course_amount"
                                            value="free"
                                            checked={
                                                data.course_amount === "free"
                                            }
                                            onChange={handleChange}
                                        />{" "}
                                        Free
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="course_amount"
                                            value="paid"
                                            checked={
                                                data.course_amount === "paid"
                                            }
                                            onChange={handleChange}
                                        />{" "}
                                        Paid
                                    </label>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <InputLabel value="Terms & Conditions" />
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="terms_accepted"
                                        checked={data.terms_accepted}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2">
                                        I agree to the Terms and Conditions
                                    </span>
                                </label>
                                <InputError message={errors.terms_accepted} />
                            </div>
                        )}

                        <div className="flex justify-between mt-6">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-400 p-2 rounded-md text-white"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="submit"
                                className="w-full text-center bg-blue-600 p-2 rounded-md text-white font-bold active:to-blue-700"
                            >
                                {step === steps.length - 1 ? "Submit" : "Next"}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MakeCourse;
