import { React, useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FaTimes } from "react-icons/fa";

const MAX_CHAR = 300;

const ChapterForm = ({
    showModal,
    setShowModal,
    singleCourse = {},
    chapterToEdit = null,
}) => {
    const isEditing = !!chapterToEdit;

    const { data, setData, post, errors, reset } = useForm({
        chapterId: null,
        chapterTitle: "",
        chapterDesc: "",
        chapterVideo: "",
        isPreview: false,
    });

    useEffect(() => {
        if (chapterToEdit) {
            setData({
                chapterId: chapterToEdit.id ?? null,
                chapterTitle: chapterToEdit.title || "",
                chapterDesc: chapterToEdit.desc || "",
                chapterVideo: chapterToEdit.video || "",
                isPreview: chapterToEdit.preview === "1",
            });
        } else {
            reset();
        }
    }, [chapterToEdit, setData, reset]);

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

        const payload = {
            chapterId: chapterToEdit?.id ?? null,
            chapterTitle: data.chapterTitle,
            chapterDesc: data.chapterDesc,
            chapterVideo: data.chapterVideo,
            isPreview: data.isPreview,
        };

        post(route("submit_course_chapter", { id: singleCourse.id }), {
            data: payload,
            preserveScroll: true,
            onSuccess: () => setShowModal(false),
        });
    };

    return (
        <div>
            {showModal && (
                <form
                    onSubmit={submit}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[60vw] h-auto relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
                            {isEditing ? "Edit Chapter" : "Add Chapter"}
                        </h2>

                        <div className="mt-5 flex space-x-6">
                            {/* Form Fields */}
                            <div className="flex flex-col w-1/2 space-y-4">
                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Title
                                    </label>
                                    <TextInput
                                        type="text"
                                        value={data.chapterTitle}
                                        onChange={(e) =>
                                            setData(
                                                "chapterTitle",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Chapter Title"
                                        required
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError
                                        message={errors.chapterTitle}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Description
                                    </label>
                                    <Textarea
                                        value={data.chapterDesc}
                                        onChange={(e) => {
                                            if (
                                                e.target.value.length <=
                                                MAX_CHAR
                                            ) {
                                                setData(
                                                    "chapterDesc",
                                                    e.target.value
                                                );
                                            }
                                        }}
                                        placeholder="Chapter Description"
                                        required
                                        className="w-full mt-1 px-3 min-h-28 max-h-36 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <div className="text-right text-sm text-gray-500 mt-1">
                                        {data.chapterDesc.length}/{MAX_CHAR}{" "}
                                        characters
                                    </div>
                                    <InputError
                                        message={errors.chapterDesc}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">
                                        Chapter Video URL
                                    </label>
                                    <TextInput
                                        type="text"
                                        value={data.chapterVideo}
                                        onChange={handleVideoChange}
                                        placeholder="Chapter Video URL"
                                        required
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError
                                        message={errors.chapterVideo}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {/* Video Preview */}
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
                                            />
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

                        {/* Footer Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <div className="flex items-center space-x-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.isPreview}
                                        onChange={() =>
                                            setData(
                                                "isPreview",
                                                !data.isPreview
                                            )
                                        }
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
                                {isEditing ? "Update Chapter" : "Add Chapter"}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ChapterForm;
