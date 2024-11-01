import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import examImage from "../images/assets/loading.png";
import moment from "moment";

export default function ExamInstructions({ cheatingBanUntil }) {
    const [agreed, setAgreed] = useState(false);
    const { course } = usePage().props;

    const instructions = [
        "There are 5 questions and you have 5 minutes to complete them.",
        "Ensure a stable internet connection throughout the exam.",
        "Your screen is being recorded for monitoring purposes.",
        "AI will detect any suspicious activities or cheating attempts.",
        "Do not open other tabs or switch screens during the exam.",
        "You cannot leave the exam page once it has started.",
    ];

    const now = new Date();
    const banUntil = cheatingBanUntil ? new Date(cheatingBanUntil) : null;
    const isBanActive = banUntil && banUntil > now;
    console.log({ cheatingBanUntil, banUntil, isBanActive });
    return (
        <>
            {isBanActive ? (
                <div className="flex">
                    <p className="text-sm text-red-600 mt-5">
                        You are temporarily banned due to cheating. Please try
                        again after {moment(banUntil).format("DD-MM-YYYY")}.
                    </p>
                </div>
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4 py-8">
                    <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">
                        {/* Left: Instructions */}
                        <div className="p-8">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                📘 Exam Instructions
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Please read all the instructions carefully
                                before starting the exam:
                            </p>

                            <ul className="space-y-4 mb-6">
                                {instructions.map((text, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="text-blue-700 w-5 h-5 mt-1" />
                                        <span className="text-gray-800 leading-relaxed">
                                            {text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-3 mb-6">
                                <input
                                    type="checkbox"
                                    id="agree"
                                    checked={agreed}
                                    onChange={(e) =>
                                        setAgreed(e.target.checked)
                                    }
                                    className="w-5 h-5 text-blue-600 border-gray-300 cursor-pointer rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="agree"
                                    className="text-sm text-gray-700"
                                >
                                    I have read and agree to follow the
                                    instructions.
                                </label>
                            </div>

                            <button
                                onClick={() =>
                                    router.visit(`/exam/id/${course.id}`)
                                }
                                disabled={!agreed}
                                className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                                    agreed
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-blue-300 cursor-not-allowed"
                                }`}
                            >
                                Start Exam
                            </button>
                        </div>

                        {/* Right: Illustration */}
                        <div className=" h flex items-center justify-center p-6">
                            <img
                                src={examImage}
                                alt="Exam Illustration"
                                className="w-72 md:w-full h-[80vh] "
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
