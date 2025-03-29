import CourseCards from "@/Components/CourseCards";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ChapterForm from "./ChapterForm";

const CourseDescription = ({
    singleCourse = {},
    auth,
    courses = [],
    chapters = [],
    isEnrolled = {},
}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    useEffect(() => {
        if (chapters.length > 0) {
            setSelectedChapter(chapters[0]);
        }
    }, [chapters]);
    return (
        <>
            <Navbar auth={auth} />
            <Head title="Course Description" />
            <div className="pt-20 max-w-6xl mx-auto p-6 space-y-6">
                {/* Course Header */}

                <div className="bg-white shadow-md p-8 rounded-2xl flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {singleCourse && singleCourse.course_title}
                        </h1>
                        <p className="text-gray-600 mt-3 leading-relaxed">
                            {singleCourse && singleCourse.course_desc}
                        </p>
                        <div className="mt-5 flex items-center gap-6">
                            <span className="font-sans">
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
                            </span>
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
                                            onClick={() => {
                                                setShowModal(true);
                                            }}
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
                        <p className="font-bold text-gray-700">Instructor:</p>
                        <p className="text-gray-600">
                            {singleCourse && singleCourse.name}
                        </p>
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
                    <aside className="w-1/4 bg-white rounded-2xl shadow-md border p-4 space-y-6 h-fit">
                        {/* Course Material */}
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Course Chapters
                            </h3>
                            <ul className="space-y-4 text-blue-600  list-decimal list-insie ">
                                {chapters.map((item) => (
                                    <li
                                        key={item.id}
                                        className="hover:underline w-full"
                                    >
                                        <button
                                            onClick={() =>
                                                setSelectedChapter(item)
                                            }
                                            className="w-full text-left"
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Additional Sections */}
                        {["Assignments", "Exams", "Grades"].map(
                            (section, index) => (
                                <div key={index} className="p-4 border-b">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Course {section}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {section === "Assignments"
                                            ? "Assignments will be shared weekly."
                                            : section === "Exams"
                                            ? "MCQs and Project-based exams."
                                            : "Grades will be shared after evaluations."}
                                    </p>
                                </div>
                            )
                        )}
                    </aside>

                    {/* Main Content */}
                    <main className="w-3/4 bg-white p-6 rounded-lg shadow-md border">
                        {selectedChapter ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-blue-700 border-b pb-4">
                                        {selectedChapter.title}
                                    </h2>
                                    {isEnrolled?.course_id ===
                                        singleCourse?.id && (
                                        <button
                                            className="bg-blue-500 px-3 py-2 rounded-md text-white"
                                            // onClick={handleMarkAsComplete}
                                        >
                                            Mark as Complete
                                        </button>
                                    )}
                                </div>
                                <p className="text-gray-700 mt-4">
                                    {selectedChapter.desc}
                                </p>

                                {/* Video or Locked Content */}
                                <div className="mt-6">
                                    {auth?.user?.id !==
                                        singleCourse?.course_teacher &&
                                    selectedChapter.preview === "0" &&
                                    (!isEnrolled ||
                                        isEnrolled?.course_id !==
                                            singleCourse?.id) ? (
                                        <div className="flex items-center space-x-2 text-red-600">
                                            <CiLock className="size-5" />
                                            <p>Locked</p>
                                        </div>
                                    ) : (
                                        <iframe
                                            src={selectedChapter.video}
                                            className="w-full h-40 md:h-96 border border-gray-300 rounded-md"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </div>

                                {/* Edit Chapter Button (For Teachers) */}
                                {auth?.user?.role !== "Student" &&
                                    auth.user?.id ===
                                        singleCourse?.course_teacher && (
                                        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                            Edit Chapter
                                        </button>
                                    )}
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
