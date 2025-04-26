import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ExamResults = ({ results, total_questions }) => {
    results = results || {};
    const percentage = (results.score / total_questions) * 100 || 0;
    const pass = percentage >= 75;

    return (
        <AuthenticatedLayout>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
                <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-4xl space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Course Name:{" "}
                            <span className="text-blue-600">
                                {results.course_title}
                            </span>
                        </h1>

                        {/* Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {percentage < 75 && (
                                <button
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                                    onClick={() => window.location.reload()}
                                >
                                    Repeat Course
                                </button>
                            )}

                            <button
                                className={`px-6 py-2 rounded-lg font-semibold transition 
    ${
        percentage >= 75
            ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
                                disabled={percentage < 75}
                            >
                                Request Certificate
                            </button>
                        </div>
                        {percentage < 75 && (
                            <p className="text-red-500 text-sm mt-2">
                                You Cannot Request A Certificate Because Your
                                Course Score Is Below 75%.
                            </p>
                        )}
                    </div>

                    {/* Details Card */}
                    <div className="bg-blue-50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div className="space-y-2 w-full">
                            <div className="text-gray-600 text-sm">
                                {results.date || "28 June 2026"}
                            </div>
                            <div className="text-xl font-bold text-gray-800">
                                {results.course_title} - Overview
                            </div>
                            <div className="text-gray-500 text-sm">
                                {results.course_desc?.length > 200
                                    ? `${results.course_desc.slice(0, 200)}...`
                                    : results.course_desc}
                            </div>

                            <a
                                href="#"
                                className="text-blue-600 text-sm font-semibold hover:underline"
                            >
                                View Course
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-4 text-center justify-center">
                            <div className="bg-white rounded-xl shadow p-4 w-24">
                                <div className="text-lg font-bold">
                                    {percentage}%
                                </div>
                                <div className="text-xs text-gray-500">
                                    Percentage
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 w-24">
                                <div className="text-lg font-bold">
                                    {results.score} / {total_questions}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Correct
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 w-24">
                                <div className="text-lg font-bold">
                                    {total_questions} min
                                </div>
                                <div className="text-xs text-gray-500">
                                    Total Time
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 w-24">
                                <div
                                    className={`text-lg font-bold ${
                                        pass ? "text-green-500" : "text-red-500"
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
        </AuthenticatedLayout>
    );
};

export default ExamResults;
