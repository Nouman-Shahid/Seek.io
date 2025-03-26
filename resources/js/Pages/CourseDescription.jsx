import CourseCards from "@/Components/CourseCards";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { FaPlus, FaCheckCircle, FaTimes } from "react-icons/fa";

const CourseDescription = ({ data = {}, auth, courses = [] }) => {
    const [showModal, setShowModal] = useState(false);
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterDesc, setChapterDesc] = useState("");
    const [chapterVideo, setChapterVideo] = useState("");
    const [isPreview, setIsPreview] = useState(false);

    const handleAddChapter = (e) => {
        e.preventDefault();
        console.log("Chapter Added:", {
            chapterTitle,
            chapterDesc,
            chapterVideo,
            isPreview,
        });
        setShowModal(false);
    };

    const handleVideoChange = (e) => {
        let url = e.target.value.trim();
        let embedUrl = url;

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const match = url.match(
                /(?:youtube\.com\/(?:.*v=|.*[?&]v=)|youtu.be\/)([^"&?\/\s]{11})/
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
                embedUrl = url; // Direct video file
            }
        }

        setChapterVideo(embedUrl);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Course Description" />
            <div className="pt-20 max-w-6xl mx-auto p-6 space-y-6">
                {/* Course Header */}
                <div className="bg-white shadow-md p-8 rounded-2xl flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {data.course_title}
                        </h1>
                        <p className="text-gray-600 mt-3 leading-relaxed">
                            {data.course_desc}
                        </p>
                        <div className="mt-5 flex items-center gap-6">
                            <span className="font-sans">
                                {data.course_amount === "free" ? (
                                    <p className="text-blue-600 font-bold">
                                        FREE
                                    </p>
                                ) : (
                                    <p className="text-green-600 font-bold">
                                        PKR {data.course_amount}
                                    </p>
                                )}
                            </span>
                            {auth.user.role === "Student" ? (
                                <Link
                                    href={`/add_to_cart/id/${data.id}`}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition-all"
                                >
                                    Add To Cart
                                </Link>
                            ) : (
                                auth.user?.id === data.course_teacher && (
                                    <div className="flex space-x-4">
                                        <Link
                                            className="bg-indigo-600 flex items-center gap-2 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-all"
                                            href={`/course_exam/id/${data.id}`}
                                        >
                                            Make Exam
                                        </Link>
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="bg-blue-600 flex items-center gap-2 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
                                        >
                                            <FaPlus /> Add Chapter
                                        </button>
                                        <button className="bg-green-600 flex items-center gap-2 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all">
                                            <FaCheckCircle /> Publish
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <img
                        src={data.course_image}
                        alt="Course"
                        className="w-80 h-64 rounded-2xl object-cover shadow-lg"
                    />
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">Instructor:</p>
                        <p className="text-gray-600">{data.name}</p>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">Skill Level:</p>
                        <p className="text-gray-600">{data.course_level}</p>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">
                            Time to Complete:
                        </p>
                        <p className="text-gray-600">
                            {data.course_hours} hours
                        </p>
                    </div>
                </div>

                {/* Related Courses */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Related Courses
                    </h2>
                    <CourseCards data={courses} auth={auth} />
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
                        <form
                            onSubmit={handleAddChapter}
                            className="mt-5 flex space-x-6"
                        >
                            {/* Left Section - Form Inputs */}
                            <div className="flex flex-col w-1/2 space-y-4">
                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Title
                                    </label>
                                    <input
                                        type="text"
                                        value={chapterTitle}
                                        onChange={(e) =>
                                            setChapterTitle(e.target.value)
                                        }
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Description
                                    </label>
                                    <textarea
                                        value={chapterDesc}
                                        onChange={(e) =>
                                            setChapterDesc(e.target.value)
                                        }
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Video URL
                                    </label>
                                    <input
                                        type="text"
                                        value={chapterVideo}
                                        onChange={handleVideoChange}
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Right Section - Video Preview */}
                            <div className="w-1/2 flex flex-col items-center">
                                {chapterVideo && (
                                    <div className="w-full">
                                        <p className="font-medium text-gray-700 mb-2">
                                            Video Preview:
                                        </p>
                                        {chapterVideo.includes("youtube.com") ||
                                        chapterVideo.includes("facebook.com") ||
                                        chapterVideo.includes(
                                            "drive.google.com"
                                        ) ? (
                                            <iframe
                                                src={chapterVideo}
                                                className="w-full h-56 border border-gray-300 rounded-md"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <video
                                                controls
                                                className="w-full h-56 border border-gray-300 rounded-md"
                                            >
                                                <source
                                                    src={chapterVideo}
                                                    type="video/mp4"
                                                />
                                                Your browser does not support
                                                this video.
                                            </video>
                                        )}
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            {/* Enable Preview moved here */}
                            <div className="flex items-center space-x-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isPreview}
                                        value="true"
                                        onChange={() => {
                                            setIsPreview(!isPreview);
                                            console.log(!isPreview);
                                        }}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                                </label>
                                <span className="font-medium text-gray-700">
                                    Enable Preview Mode
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
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default CourseDescription;
