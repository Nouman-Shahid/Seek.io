import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import Navbar from "@/Components/Navbar";
import { Head, router } from "@inertiajs/react";

const ExamResults = ({ results, total_questions, auth }) => {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    results = results || {};
    const percentage = (results.score / total_questions) * 100 || 0;
    const pass = percentage >= 75;

    return (
        <>
            <Navbar auth={auth} />
            <Head title="Exam Result" />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
                <div
                    className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-4xl space-y-6"
                    data-aos="fade-up"
                >
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Course Name:{" "}
                            <span className="text-blue-600">
                                {results.course_title}
                            </span>
                        </h1>

                        <div className="text-sm text-gray-500">
                            {pass ? (
                                <span className="text-green-600 font-medium">
                                    🎉 Congratulations! You passed the course.
                                </span>
                            ) : (
                                <span className="text-red-500 font-medium">
                                    🚫 Don't worry, try again and keep learning!
                                </span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {!pass && (
                                <button
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                                    onClick={() =>
                                        router.visit(` /course/id/${results.course_id}
`)
                                    }
                                >
                                    Repeat Course
                                </button>
                            )}

                            <button
                                className={`px-6 py-2 rounded-lg font-semibold transition ${
                                    pass
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                                disabled={!pass}
                            >
                                Request Certificate
                            </button>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="bg-blue-50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div className="space-y-2 w-full md:w-2/3">
                            <div className="text-gray-600 text-sm">
                                {results.date || "28 June 2026"}
                            </div>
                            <div className="text-xl font-bold text-gray-800">
                                {results.course_title} - Overview
                            </div>
                            <div className="text-gray-500 text-sm leading-relaxed">
                                {results.course_desc?.length > 200
                                    ? `${results.course_desc.slice(0, 200)}...`
                                    : results.course_desc}
                            </div>
                            <a
                                href={`/course/id/${results.course_id}`}
                                className="text-blue-600 text-sm font-semibold hover:underline"
                            >
                                View Course
                            </a>
                        </div>

                        {/* Circular Progress + Stats */}
                        <div className="flex flex-wrap justify-center items-center gap-4 w-full md:w-1/3">
                            <div className="w-24 h-24">
                                <CircularProgressbar
                                    value={percentage}
                                    text={`${Math.round(percentage)}%`}
                                    styles={buildStyles({
                                        textColor: "#111",
                                        pathColor: pass ? "#22c55e" : "#ef4444",
                                        trailColor: "#e5e7eb",
                                        textSize: "18px",
                                        strokeLinecap: "round",
                                    })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 text-center">
                                <div className="bg-white rounded-xl shadow p-3 w-24">
                                    <div className="text-lg font-bold">
                                        {results.score} / {total_questions}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Correct
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow p-3 w-24">
                                    <div className="text-lg font-bold">
                                        {total_questions} min
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Total Time
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow p-3 w-24">
                                    <div
                                        className={`text-lg font-bold ${
                                            pass
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {pass ? "PASS" : "FAIL"}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Status
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamResults;
