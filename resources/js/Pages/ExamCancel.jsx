import { router } from "@inertiajs/react";
import { FileWarning } from "lucide-react";
import React from "react";

const ExamCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="max-w-xl w-full text-center border border-blue-100 shadow-lg rounded-2xl p-10">
                <div className="flex justify-center mb-6">
                    <FileWarning className="h-16 w-16 text-blue-800" />
                </div>
                <h1 className="text-3xl font-bold text-blue-800 mb-4">
                    Exam Cancelled Due to Cheating
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                    Our cheating detection system has detected suspicious
                    activity during your exam session.
                </p>
                <p className="text-gray-600 text-md mb-6">
                    As a result, your exam has been cancelled. If you believe
                    this is a mistake, please contact the academic support team
                    immediately.
                </p>
                <button
                    onClick={() => router.visit("/")}
                    className="mt-4 px-6 py-3 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition duration-300"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default ExamCancel;
