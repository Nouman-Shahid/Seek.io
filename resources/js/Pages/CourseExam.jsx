import React, { useState } from "react";
import examImage from "../images/assets/loading.png"; // Replace with an actual image path

const CourseExam = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl text-center h-[60vh] flex flex-col justify-between w-full rounded-tr-none rounded-b-none">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Exam Instructions
                </h1>
                <p className="text-gray-600 text-sm">
                    Welcome to the course exam. Please read the instructions
                    carefully before starting:
                </p>
                <ul className="text-gray-700 text-left space-y-2 text-sm">
                    <li>
                        ✅ Ensure a stable internet connection throughout the
                        exam.
                    </li>
                    <li>
                        ✅ Your screen is being recorded for monitoring
                        purposes.
                    </li>
                    <li>
                        ✅ Our AI system will detect any suspicious activities
                        or cheating attempts.
                    </li>
                    <li>
                        ✅ Do not open other tabs, switch screens, or use
                        unauthorized materials.
                    </li>
                    <li>
                        ✅ Once you start, you cannot leave the exam page until
                        submission.
                    </li>
                </ul>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="agree"
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label htmlFor="agree" className="text-sm text-gray-700">
                        I have read and agree to the instructions.
                    </label>
                </div>
                <button
                    className={`px-6 py-2 text-white font-semibold rounded-lg ${
                        isChecked
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!isChecked}
                >
                    Start Exam
                </button>
            </div>
            <img
                src={examImage}
                alt="Exam Instructions"
                className="w-60 h-[60vh] object-cover rounded-lg shadow-lg rounded-tl-none rounded-bl-none"
            />
        </div>
    );
};

export default CourseExam;
