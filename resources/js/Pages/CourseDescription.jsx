import CourseCards from "@/Components/CourseCards";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Textarea } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FaPlus, FaCheckCircle, FaTimes } from "react-icons/fa";
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { router } from "@inertiajs/react";

const CourseDescription = ({
    singleCourse = {},
    auth,
    courses = [],
    chapters = [],
}) => {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, errors } = useForm({
        chapterTitle: "",
        chapterDesc: "",
        chapterVideo: "",
        isPreview: false,
    });

    const handleVideoChange = (e) => {
        let url = e.target.value.trim();
        let embedUrl = url;

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const match = url.match(
                /(?:youtube\.com\/(?:.*v=|.*[?&]v=)|youtu.be\/)([^"&?/\s]{11})/
            );
            if (match) {
                embedUrl = `https://www.youtube.com/embed/${match[1]}`;
            }
        } else if (url.includes("drive.google.com")) {
            const match = url.match(/\/d\/([^\/]+)\//);
            if (match) {
                embedUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
            }
        } else if (url.includes("facebook.com")) {
            embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                url
            )}`;
        } else if (url.includes("github.com") && url.includes("/blob/")) {
            embedUrl = url.replace("/blob/", "/raw/");
        } else {
            const fileExtensions = [".mp4", ".webm", ".ogg"];
            if (fileExtensions.some((ext) => url.endsWith(ext))) {
                embedUrl = url;
            }
        }

        setData("chapterVideo", embedUrl);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("submit_course_chapter", { id: singleCourse.id }), {
            preserveScroll: true,
            onSuccess: () => setShowModal(false),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Course Description" />
            <div className="pt-20 max-w-6xl mx-auto p-6 space-y-6">
                {/* Course Header */}
                <div className="bg-white shadow-md p-8 rounded-2xl flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {singleCourse.course_title}
                        </h1>
                        <p className="text-gray-600 mt-3 leading-relaxed">
                            {singleCourse.course_desc}
                        </p>
                        <div className="mt-5 flex items-center gap-6">
                            <span className="font-sans">
                                {singleCourse.course_amount === "free" ? (
                                    <p className="text-blue-600 font-bold">
                                        FREE
                                    </p>
                                ) : (
                                    <p className="text-green-600 font-bold">
                                        PKR {singleCourse.course_amount}
                                    </p>
                                )}
                            </span>
                            {auth.user.role === "Student" ? (
                                <Link
                                    href={`/add_to_cart/id/${singleCourse.id}`}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition-all"
                                >
                                    Add To Cart
                                </Link>
                            ) : (
                                auth.user?.id ===
                                    singleCourse.course_teacher && (
                                    <div className="flex space-x-4">
                                        <Link
                                            className="bg-indigo-600 flex items-center gap-2 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-all"
                                            href={`/course_exam/id/${singleCourse.id}`}
                                        >
                                            Make Exam
                                        </Link>
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="bg-blue-600 flex items-center gap-2 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
                                        >
                                            <FaPlus /> Add Chapter
                                        </button>
                                        <button
                                            onClick={() =>
                                                router.post(
                                                    `/publish_course/id/${singleCourse.id}`
                                                )
                                            }
                                            disabled={chapters.length === 0}
                                            className={`flex items-center gap-2 px-5 py-2 rounded-md transition-all ${
                                                chapters.length > 0
                                                    ? "bg-green-600 text-white hover:bg-green-700"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                        >
                                            <FaCheckCircle />{" "}
                                            {chapters.length > 0
                                                ? "Publish"
                                                : "Cannot Publish"}
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <img
                        src={singleCourse.course_image}
                        alt="Course"
                        className="w-80 h-64 rounded-2xl object-cover shadow-lg"
                    />
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">Instructor:</p>
                        <p className="text-gray-600">{singleCourse.name}</p>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">Skill Level:</p>
                        <p className="text-gray-600">
                            {singleCourse.course_level}
                        </p>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">
                            Time to Complete:
                        </p>
                        <p className="text-gray-600">
                            {singleCourse.course_hours} hours
                        </p>
                    </div>
                </div>

                {chapters.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-6 p-4 h-64 border rounded-lg shadow-md bg-white"
                    >
                        {/* Left Side: Title, Description, and Actions */}
                        <div className="flex-1 h-full flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Preview Status & Edit Button */}
                            <div className="flex items-center justify-between border-t pt-2 mt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        {item.preview === "1" ? (
                                            <div className="flex items-center space-x-2">
                                                <CiUnlock className="size-5" />
                                                <p>Free Preview</p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-2">
                                                <CiLock className="size-5" />
                                                <p>Locked</p>
                                            </div>
                                        )}
                                    </span>
                                </div>

                                {/* Edit Button */}
                                <Link className="bg-green-600 flex items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all">
                                    Edit Chapter
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Video */}
                        <div className="w-1/3">
                            <iframe
                                src={item.video}
                                className="w-full h-40 md:h-56 border border-gray-300 rounded-md"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ))}

                {/* Related Courses */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Related Courses
                    </h2>
                    <CourseCards singleCourse={courses} auth={auth} />
                </div>
            </div>

            {showModal && (
                <form
                    onSubmit={submit}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[60vw] h-auto relative">
                        {/* Cross Button at Top-Right */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
                            Add Chapter
                        </h2>
                        <div className="mt-5 flex space-x-6">
                            {/* Left Section - Form Inputs */}
                            <div className="flex flex-col w-1/2 space-y-4">
                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Title
                                    </label>
                                    <TextInput
                                        type="text"
                                        value={data.chapterTitle}
                                        placeholder="Chapter Title"
                                        onChange={(e) =>
                                            setData(
                                                "chapterTitle",
                                                e.target.value
                                            )
                                        }
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    <InputError
                                        message={errors.chapterTitle}
                                        className="mt-2"
                                    />{" "}
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Description
                                    </label>
                                    <Textarea
                                        value={data.chapterDesc}
                                        placeholder="Chapter Description"
                                        onChange={(e) =>
                                            setData(
                                                "chapterDesc",
                                                e.target.value
                                            )
                                        }
                                        className="w-full mt-1 px-3 min-h-28 max-h-36 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    ></Textarea>
                                    <InputError
                                        message={errors.chapterDesc}
                                        className="mt-2"
                                    />{" "}
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Video URL
                                    </label>
                                    <TextInput
                                        type="text"
                                        value={data.chapterVideo}
                                        onChange={handleVideoChange}
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        placeholder="Chapter Video URL"
                                    />
                                    <InputError
                                        message={errors.chapterVideo}
                                        className="mt-2"
                                    />{" "}
                                </div>
                            </div>

                            {/* Right Section - Video Preview */}
                            <div className="w-1/2 flex flex-col items-center">
                                {data.chapterVideo && (
                                    <div className="w-full">
                                        <p className="font-medium text-gray-700 mb-2">
                                            Video Preview:
                                        </p>
                                        {data.chapterVideo.includes(
                                            "youtube.com"
                                        ) ||
                                        data.chapterVideo.includes(
                                            "facebook.com"
                                        ) ||
                                        data.chapterVideo.includes(
                                            "drive.google.com"
                                        ) ? (
                                            <iframe
                                                src={data.chapterVideo}
                                                className="w-full h-56 border border-gray-300 rounded-md"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <video
                                                controls
                                                className="w-full h-56 border border-gray-300 rounded-md"
                                            >
                                                <source
                                                    src={data.chapterVideo}
                                                    type="video/mp4"
                                                />
                                                Your browser does not support
                                                this video.
                                            </video>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            {/* Enable Preview moved here */}
                            <div className="flex items-center space-x-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.isPreview}
                                        onChange={() => {
                                            setData(
                                                "isPreview",
                                                !data.isPreview
                                            );
                                        }}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                                </label>
                                <span className="font-medium text-gray-700">
                                    Enable Free Preview
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                            >
                                Add Chapter
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </AuthenticatedLayout>
    );
};

export default CourseDescription;
