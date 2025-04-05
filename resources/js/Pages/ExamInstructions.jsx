import React, { useState } from "react";
import examImage from "../images/assets/loading.png"; // Make sure this is a valid image path
import { Link } from "@inertiajs/react";

const ExamInstructions = ({ exam, course }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white shadow-2xl rounded-2xl flex w-full max-w-5xl overflow-hidden">
                {/* Left Content */}
                <div className="w-full md:w-3/5 p-10 flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            📘 Exam Instructions
                        </h1>
                        <p className="text-gray-600 text-md mb-4">
                            Please read all the instructions carefully before
                            starting the exam:
                        </p>
                        <ul className="text-gray-800 space-y-4 my-10 text-md  list-inside leading-relaxed">
                            <li>
                                ✅ There are <strong>{exam.exam_time}</strong>{" "}
                                questions and you have{" "}
                                <strong>{exam.exam_time} minutes</strong> to
                                complete them.
                            </li>
                            <li>
                                ✅ Ensure a stable internet connection
                                throughout the exam.
                            </li>
                            <li>
                                ✅ Your screen is being recorded for monitoring
                                purposes.
                            </li>
                            <li>
                                ✅ AI will detect any suspicious activities or
                                cheating attempts.
                            </li>
                            <li>
                                ✅ Do not open other tabs or switch screens
                                during the exam.
                            </li>
                            <li>
                                ✅ You cannot leave the exam page once it has
                                started.
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4 flex  justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="agree"
                                className="mt-1 w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 rounded"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <label
                                htmlFor="agree"
                                className="text-sm text-gray-700"
                            >
                                I have read and agree to follow the
                                instructions.
                            </label>
                        </div>

                        <Link
                            href={`/exam/id/${course.id}`}
                            className={` p-3 font-semibold rounded-lg transition-all duration-200 ${
                                isChecked
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                            disabled={!isChecked}
                        >
                            Start Exam
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="hidden md:block md:w-2/5 bg-blue-100">
                    <img
                        src={examImage}
                        alt="Exam Visual"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default ExamInstructions;
