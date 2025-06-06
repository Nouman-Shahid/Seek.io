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
import { MdDelete } from "react-icons/md";
import { BadgeCheck, Clock, Star } from "lucide-react";
import FeedbackDrawer from "@/Components/FeedbackDrawer";

const CourseDescription = ({
    singleCourse = {},
    auth,
    courses = [],
    chapters = [],
    isEnrolled = {},
    completedChapters = [],
    feedbacks = [],
    courseExam = {},
}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [chapterToEdit, setChapterToEdit] = useState(null);
    const [showFeedbackDrawer, setShowFeedbackDrawer] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleRatingClick = () => {
        setShowFeedbackDrawer(true);
    };

    useEffect(() => {
        if (chapters.length > 0) {
            setSelectedChapter(chapters[0]);
        }
    }, [chapters]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const courseKey = `${singleCourse.id}-${auth?.user?.id}`;
        const hasSeenConfetti = localStorage.getItem(courseKey);

        if (
            isEnrolled?.course_id === singleCourse?.id &&
            completedChapters.length === chapters.length &&
            chapters.length > 0 &&
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
        auth?.user?.id,
        isEnrolled?.course_id,
    ]);

    return (
        <>
            <Navbar auth={auth} />
            <Head title="Course Description" />

            {showConfetti && (
                <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            {singleCourse.publish === "Published" ? (
                <div className="pt-20 max-w-7xl mx-auto p-6 space-y-10">
                    {/* Course Header */}
                    <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 space-y-4">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {singleCourse?.course_title}
                            </h1>
                            <pre className="whitespace-pre-line text-gray-700 font-sans leading-relaxed">
                                {singleCourse?.course_desc}
                            </pre>
                            <p className="text-gray-600">
                                Course by:{" "}
                                <Link
                                    href={`/user/${singleCourse.course_teacher}`}
                                    className="font-semibold text-blue-700 hover:underline"
                                >
                                    {singleCourse?.name}
                                </Link>
                            </p>
                            <div className="flex items-center gap-4 pt-2">
                                {auth?.user?.role === "Student" ? (
                                    isEnrolled?.course_id ===
                                    singleCourse?.id ? (
                                        <button
                                            className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed"
                                            disabled
                                        >
                                            Enrolled
                                        </button>
                                    ) : (
                                        <Link
                                            href={`/add_to_cart/id/${singleCourse.id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                                        >
                                            Add To Cart
                                        </Link>
                                    )
                                ) : (
                                    singleCourse?.course_teacher ===
                                        auth.user?.id && (
                                        <div className="flex gap-4 items-center">
                                            {chapters.length > 0 && (
                                                <Link
                                                    href={`/course_exam/id/${singleCourse.id}`}
                                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                                                >
                                                    <FaCheckCircle /> Make Exam
                                                </Link>
                                            )}
                                            <button
                                                onClick={() =>
                                                    router.post(
                                                        `/publish_course/id/${singleCourse.id}`
                                                    )
                                                }
                                                disabled={
                                                    singleCourse.publish ===
                                                        "Published" ||
                                                    chapters.length === 0 ||
                                                    !courseExam?.length > 0 // Changed this condition
                                                }
                                                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                                                    singleCourse.publish ===
                                                        "Published" ||
                                                    chapters.length === 0 ||
                                                    !courseExam?.length > 0 // Changed this condition
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        : "bg-green-600 text-white hover:bg-green-700"
                                                }`}
                                            >
                                                <FaCheckCircle />
                                                {singleCourse.publish ===
                                                "Published"
                                                    ? "Published"
                                                    : "Publish"}
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                            {auth?.user?.role === "Teacher" &&
                                chapters.length === 0 && (
                                    <p className="text-red-500 text-sm pt-1">
                                        Add at least one chapter to publish the
                                        course.
                                    </p>
                                )}
                        </div>
                        <img
                            src={singleCourse?.course_image}
                            alt="Course"
                            className="w-full max-w-sm h-64 rounded-xl object-cover shadow-md"
                        />
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {/* Rating */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 ">
                            <div className="flex flex-col items-center text-center">
                                <Star className="w-8 h-8 text-yellow-500 mb-2" />
                                <p className="text-sm text-gray-500 tracking-wide mb-1">
                                    Rating
                                </p>
                                <p
                                    onClick={handleRatingClick}
                                    className="text-3xl font-semibold text-gray-900 hover:underline cursor-pointer"
                                >
                                    {singleCourse?.course_rating
                                        ? Number(
                                              singleCourse.course_rating
                                          ).toFixed(1)
                                        : "0"}
                                </p>
                            </div>
                        </div>

                        {/* Skill Level */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                            <div className="flex flex-col items-center text-center">
                                <BadgeCheck className="w-8 h-8 text-blue-500 mb-2" />
                                <p className="text-sm text-gray-500 tracking-wide mb-1">
                                    Skill Level
                                </p>
                                <p className="text-3xl font-semibold text-gray-900">
                                    {singleCourse?.course_level}
                                </p>
                            </div>
                        </div>

                        {/* Time to Complete */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100  ">
                            <div className="flex flex-col items-center text-center">
                                <Clock className="w-8 h-8 text-green-500 mb-2" />
                                <p className="text-sm text-gray-500 tracking-wide mb-1">
                                    Time to Complete
                                </p>
                                <p className="text-3xl font-semibold text-gray-900">
                                    {singleCourse?.course_hours} hrs
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6 mt-10">
                        <aside className="w-full h-fit lg:w-1/3 bg-white rounded-xl p-5 shadow-lg space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Course Chapters
                                    </h3>
                                    {auth?.user?.id ===
                                        singleCourse?.course_teacher && (
                                        <button
                                            onClick={() => {
                                                setChapterToEdit(null);
                                                setShowModal(true);
                                            }}
                                            className="bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700"
                                        >
                                            <FaPlus />
                                        </button>
                                    )}
                                </div>
                                <ul className="space-y-2">
                                    {chapters.map((item, index) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() =>
                                                    setSelectedChapter(item)
                                                }
                                                className={`flex items-center gap-2 w-full ${
                                                    completedChapters.includes(
                                                        Number(item.id)
                                                    )
                                                        ? "bg-green-50 hover:bg-green-100"
                                                        : "bg-gray-100 hover:bg-blue-100"
                                                } text-left px-4 py-2 rounded-md text-gray-800`}
                                            >
                                                <span className="font-semibold">
                                                    {index + 1}.
                                                </span>
                                                <span className="truncate">
                                                    {item.title}
                                                </span>
                                                {completedChapters.includes(
                                                    Number(item.id)
                                                ) && (
                                                    <FaCheckCircle className="text-green-500 ml-auto" />
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Exam Button Section */}
                            {isEnrolled?.course_id === singleCourse?.id &&
                                completedChapters.length === chapters.length &&
                                chapters.length > 0 && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() =>
                                                router.visit(
                                                    `/exam_instructions/${singleCourse.id}`
                                                )
                                            }
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                                        >
                                            Give Exam
                                        </button>
                                    </div>
                                )}
                        </aside>

                        <main className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                            {selectedChapter ? (
                                <>
                                    <div className="bg-gray-50 p-4 rounded-md shadow flex justify-between items-center">
                                        <div className="flex flex-col w-full">
                                            <div className="flex w-full justify-between items-center ">
                                                <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-300 mb-1">
                                                    {selectedChapter.title}
                                                </h2>
                                                {auth?.user?.id ===
                                                    singleCourse?.course_teacher && (
                                                    <button
                                                        onClick={() => {
                                                            const confirmed =
                                                                window.confirm(
                                                                    "Are you sure you want to delete this chapter?"
                                                                );
                                                            if (confirmed) {
                                                                router.visit(
                                                                    `/remove_chapter/id/${selectedChapter.id}`
                                                                );
                                                            }
                                                        }}
                                                        className="bg-red-100 text-red-500 p-2 rounded-full hover:scale-110"
                                                    >
                                                        <MdDelete className="size-5" />
                                                    </button>
                                                )}
                                            </div>
                                            {isEnrolled?.course_id !==
                                                singleCourse?.id &&
                                                (selectedChapter.preview !==
                                                "0" ? (
                                                    <div className="text-green-600 font-semibold flex items-center gap-1">
                                                        <CiUnlock /> Free
                                                        Preview
                                                    </div>
                                                ) : (
                                                    <div className="text-red-600 font-semibold flex items-center gap-1">
                                                        <CiLock /> Paid Access
                                                    </div>
                                                ))}
                                        </div>
                                        {isEnrolled?.course_id ===
                                            singleCourse?.id &&
                                            (!completedChapters.includes(
                                                Number(selectedChapter.id)
                                            ) ? (
                                                <Link
                                                    href={`/chapter_complete/id/${selectedChapter.id}`}
                                                    className="bg-blue-600 text-white w-1/3 px-4 py-2 rounded-md hover:bg-blue-700"
                                                >
                                                    Mark as Complete
                                                </Link>
                                            ) : (
                                                <p className="text-green-600 font-bold">
                                                    Completed
                                                </p>
                                            ))}
                                    </div>

                                    <p className="mt-4 text-gray-700 leading-relaxed">
                                        {selectedChapter.desc}
                                    </p>

                                    <div className="mt-6">
                                        {auth?.user?.id !==
                                            singleCourse?.course_teacher &&
                                        selectedChapter.preview === "0" &&
                                        (!isEnrolled ||
                                            isEnrolled?.course_id !==
                                                singleCourse?.id) ? (
                                            <div className="bg-red-100 text-red-700 p-4 rounded-md flex gap-2 items-start">
                                                <CiLock className="mt-1" />
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
                                                className="w-full h-64 md:h-96 rounded-md border border-gray-300 shadow-sm"
                                                allowFullScreen
                                            />
                                        )}
                                    </div>

                                    {auth?.user?.role !== "Student" &&
                                        auth.user?.id ===
                                            singleCourse?.course_teacher && (
                                            <div className="mt-4">
                                                <button
                                                    onClick={() => {
                                                        setChapterToEdit(
                                                            selectedChapter
                                                        );
                                                        setShowModal(true);
                                                    }}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                                >
                                                    Edit Chapter
                                                </button>
                                            </div>
                                        )}
                                </>
                            ) : (
                                <p className="text-center text-gray-600">
                                    Select a chapter to view details.
                                </p>
                            )}
                        </main>
                    </div>
                    {/* Related Courses */}
                    <section>
                        <CourseCards
                            data={courses}
                            auth={auth}
                            text={"Related Courses"}
                        />
                    </section>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
                    <img
                        src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
                        alt="No courses"
                        className="w-64 h-64 mb-6 md:w-96 md:h-80 mix-blend-multiply"
                    />
                    <div className="flex flex-col relative -top-24">
                        <h2 className="  text-xl md:text-2xl font-semibold text-gray-800">
                            No Course Found
                        </h2>
                        <p className="mt-2 text-sm md:text-base text-gray-600 max-w-md">
                            We couldn’t find any courses matching your criteria.
                            Try adjusting your filters or check back later!
                        </p>
                    </div>
                </div>
            )}
            <ChapterForm
                showModal={showModal}
                setShowModal={setShowModal}
                singleCourse={singleCourse}
                chapterToEdit={chapterToEdit}
            />

            <FeedbackDrawer
                isOpen={showFeedbackDrawer}
                onClose={() => setShowFeedbackDrawer(false)}
                feedbacks={feedbacks}
                courseId={singleCourse.id}
                auth={auth}
            />

            <Footer />
        </>
    );
};

export default CourseDescription;
