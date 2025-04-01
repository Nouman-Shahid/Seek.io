import CourseCards from "@/Components/CourseCards";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ChapterForm from "./ChapterForm";
import ReactConfetti from "react-confetti";
import CompletionAudio from "../Audio/course_completion.mp3";
const CourseDescription = ({
    singleCourse = {},
    auth,
    courses = [],
    chapters = [],
    isEnrolled = {},
    completedChapters = [],
}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (chapters.length > 0) {
            setSelectedChapter(chapters[0]);
        }
    }, [chapters]);

    useEffect(() => {
        const courseKey = `${singleCourse.id}-${auth.user.id}`;
        const hasSeenConfetti = localStorage.getItem(courseKey);

        if (
            completedChapters.length === chapters.length &&
            completedChapters.length > 0 &&
            !hasSeenConfetti
        ) {
            setShowConfetti(true);
            const audio = new Audio(CompletionAudio);
            audio.play().catch((err) => console.log("Autoplay blocked:", err));
            localStorage.setItem(courseKey, "true");
            setTimeout(() => setShowConfetti(false), 10000);
        }
    }, [
        completedChapters.length,
        chapters.length,
        singleCourse.id,
        auth.user.id,
    ]);

    return (
        <>
            <Navbar auth={auth} />
            <Head title="Course Description" />
            <div className="pt-20 max-w-6xl mx-auto p-6 space-y-6">
                {/* Course Header */}

                <div className="bg-gray-50  shadow-md p-8 rounded-2xl flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {singleCourse && singleCourse.course_title}
                        </h1>
                        <p className="text-gray-600 mt-3 leading-relaxed">
                            {singleCourse && singleCourse.course_desc}
                        </p>
                        <p className="text-gray-600 mt-5">
                            Course by:{" "}
                            <Link
                                href={`/user/${singleCourse.course_teacher}`}
                                className=" hover:underline font-bold "
                            >
                                {singleCourse && singleCourse.name}
                            </Link>
                        </p>
                        <div className="mt-5 flex items-center gap-6">
                            {/* <span className="font-sans">
                                {singleCourse &&
                                singleCourse.course_amount === "free" ? (
                                    <p className="text-blue-600 font-bold">
                                        FREE
                                    </p>
                                ) : (
                                    <p className="text-green-600 font-bold">
                                        PKR{" "}
                                        {singleCourse &&
                                            singleCourse.course_amount}
                                    </p>
                                )}
                            </span> */}
                            {auth?.user?.role !== "Teacher" ? (
                                isEnrolled?.course_id === singleCourse?.id ? (
                                    <button
                                        className="bg-gray-300 text-gray-500 px-5 py-2 rounded-lg cursor-not-allowed"
                                        disabled
                                    >
                                        Enrolled
                                    </button>
                                ) : (
                                    <Link
                                        href={`/add_to_cart/id/${singleCourse.id}`}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition-all"
                                    >
                                        Add To Cart
                                    </Link>
                                )
                            ) : (
                                singleCourse &&
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
                                            onClick={() =>
                                                router.post(
                                                    `/publish_course/id/${singleCourse.id}`
                                                )
                                            }
                                            disabled={
                                                singleCourse.publish ===
                                                    "Published" ||
                                                chapters.length === 0
                                            }
                                            className={`flex items-center gap-2 px-5 py-2 rounded-md transition-all ${
                                                singleCourse.publish ===
                                                "Published"
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : chapters.length > 0
                                                    ? "bg-green-600 text-white hover:bg-green-700"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                        >
                                            <FaCheckCircle />
                                            {singleCourse.publish ===
                                            "Published"
                                                ? "Published"
                                                : chapters.length > 0
                                                ? "Publish"
                                                : "Cannot Publish"}
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <img
                        src={singleCourse && singleCourse.course_image}
                        alt="Course"
                        className="w-80 h-64 rounded-2xl object-cover shadow-lg"
                    />
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">Rating:</p>
                        <div className="text-gray-600">
                            {singleCourse && singleCourse.course_rating}
                        </div>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">Skill Level:</p>
                        <p className="text-gray-600">
                            {singleCourse && singleCourse.course_level}
                        </p>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-lg text-center shadow-sm">
                        <p className="font-bold text-gray-700">
                            Time to Complete:
                        </p>
                        <p className="text-gray-600">
                            {singleCourse && singleCourse.course_hours} hours
                        </p>
                    </div>
                </div>

                {/* Chapters Details */}
                <div className="flex gap-8 mt-12">
                    {/* Sidebar */}
                    <aside className="w-1/3 bg-white rounded-2xl shadow-md border p-4 space-y-6 h-fit">
                        {/* Course Material */}
                        <div
                            className={`p-4 ${
                                auth.user.role === "Teacher" ||
                                isEnrolled?.course_id !== singleCourse?.id
                                    ? ""
                                    : " border-b"
                            }`}
                        >
                            <div className="flex justify-between">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    Course Chapters
                                </h3>
                                {singleCourse.course_teacher ===
                                    auth.user.id && (
                                    <button
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                        className="bg-blue-600 flex items-center size-6 justify-center text-white rounded-full hover:bg-blue-700 transition-all"
                                    >
                                        <FaPlus />
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-2  text-blue-700">
                                {chapters.map((item, index) => (
                                    <li key={item.id} className="w-full">
                                        <button
                                            onClick={() =>
                                                setSelectedChapter(item)
                                            }
                                            className="flex items-center justify-center gap-3 text-gray-800 font-medium bg-gray-50 border  px-4 py-3 rounded-lg shadow-md w-full text-left hover:bg-blue-100 transition duration-200"
                                        >
                                            <div className="flex w-full space-x-2">
                                                <span className="font-semibold ">
                                                    {index + 1}.
                                                </span>
                                                <span className="truncate flex">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Additional Sections */}
                        {auth.user.role !== "Teacher" &&
                            isEnrolled.course_id === singleCourse.id &&
                            [
                                "Chapters Completed",
                                "Course Exam",
                                "Course Grades",
                            ].map((items, index) => (
                                <div
                                    key={index}
                                    className="p-4 border-b flex flex-col space-y-5"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {items}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {items === "Chapters Completed" ? (
                                            <div className="flex items-center justify-center gap-3 text-gray-800 font-medium bg-gray-50 border  px-4 py-3 rounded-lg shadow-md">
                                                <FaCheckCircle className="text-green-500 size-5" />
                                                {showConfetti && (
                                                    <>
                                                        <ReactConfetti className="h-[200vh] w-full" />
                                                    </>
                                                )}

                                                <p>
                                                    <span className="text-green-600">
                                                        {
                                                            completedChapters.length
                                                        }
                                                    </span>{" "}
                                                    / {chapters.length}
                                                </p>
                                            </div>
                                        ) : items === "Course Exam" ? (
                                            <>
                                                {completedChapters.length ===
                                                    chapters.length &&
                                                isEnrolled?.course_id ===
                                                    singleCourse?.id ? (
                                                    <Link
                                                        // href={`/exam/id/${singleCourse.id}`}
                                                        href={`/course_exam`}
                                                        className="bg-green-600 w-60 text-center text-white px-4 py-2 rounded-md"
                                                    >
                                                        Give Exam
                                                    </Link>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-3 text-gray-800 font-medium bg-gray-50 border px-4 py-3 rounded-lg shadow-md">
                                                        <span className="text-gray-700">
                                                            <span className="text-blue-600 font-semibold">
                                                                📚 Complete
                                                                Chapters
                                                            </span>{" "}
                                                            inorder to unlock
                                                            exams.
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            "Grades will be shared after evaluations."
                                        )}
                                    </p>
                                </div>
                            ))}
                    </aside>

                    {/* Main Content */}
                    <main className="w-3/4 bg-white p-6 rounded-lg shadow-md border">
                        {selectedChapter ? (
                            <>
                                {/* Chapter Header */}
                                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                                    <div className="w-full">
                                        <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-300 pb-2">
                                            {selectedChapter.title}
                                        </h2>
                                        {isEnrolled?.course_id ===
                                        singleCourse?.id ? (
                                            ""
                                        ) : selectedChapter.preview !== "0" ? (
                                            <div className="text-md text-green-500 mt-2 font-bold flex items-center space-x-1">
                                                <CiUnlock />
                                                <p> Free Preview</p>
                                            </div>
                                        ) : (
                                            <div className="text-md text-red-700 mt-2 font-bold flex items-center space-x-1">
                                                <CiLock />
                                                <p> Paid Access</p>
                                            </div>
                                        )}
                                    </div>
                                    {isEnrolled?.course_id ===
                                        singleCourse?.id &&
                                        (!completedChapters.includes(
                                            Number(selectedChapter?.id)
                                        ) ? (
                                            <Link
                                                href={`/chapter_complete/id/${selectedChapter.id}`}
                                                className="bg-blue-600 w-60 text-center text-white px-4 py-2 rounded-md"
                                            >
                                                Mark as Complete
                                            </Link>
                                        ) : (
                                            <p className="text-green-600 font-bold">
                                                Completed
                                            </p>
                                        ))}
                                </div>

                                {/* Chapter Description */}
                                <p className="text-gray-700 mt-4 leading-relaxed">
                                    {selectedChapter.desc}
                                </p>

                                {/* Video Section */}
                                <div className="mt-6">
                                    {auth?.user?.id !==
                                        singleCourse?.course_teacher &&
                                    selectedChapter.preview === "0" &&
                                    (!isEnrolled ||
                                        isEnrolled?.course_id !==
                                            singleCourse?.id) ? (
                                        <div className="flex items-center space-x-3 text-red-600 bg-red-100 p-3 rounded-lg">
                                            <CiLock className="size-5" />
                                            <div>
                                                <p className="font-semibold">
                                                    Access Restricted
                                                </p>
                                                <p className="text-sm">
                                                    This chapter is locked.
                                                    Enroll in the course to
                                                    unlock full access.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <iframe
                                            src={selectedChapter.video}
                                            className="w-full h-40 md:h-96 border border-gray-300 rounded-md shadow-sm"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </div>

                                {/* Edit Button (Only for Teachers) */}
                                <div className="flex mt-4">
                                    {auth?.user?.role !== "Student" &&
                                        auth.user?.id ===
                                            singleCourse?.course_teacher && (
                                            <Link
                                                href={`/edit_chapter/id/${selectedChapter.id}`}
                                                className=" bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                            >
                                                Edit Chapter
                                            </Link>
                                        )}
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-600">
                                Select a chapter to view details.
                            </div>
                        )}
                    </main>
                </div>

                {/* Related Courses */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-36">
                        Related Courses
                    </h2>
                    <CourseCards data={courses} auth={auth} />
                </div>
            </div>

            {/* Chapter Form */}

            <ChapterForm
                showModal={showModal}
                setShowModal={setShowModal}
                singleCourse={singleCourse}
            />

            <Footer />
        </>
    );
};

export default CourseDescription;
