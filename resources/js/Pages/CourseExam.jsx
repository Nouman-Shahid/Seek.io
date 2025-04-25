import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import image from "../images/assets/aboutImage1.png";

const CourseExam = ({ course, questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const { data, setData, post, processing } = useForm({
        answers: questions.map((q) => ({
            questionId: q.id,
            selectedOption: null,
        })),
    });

    const handleOptionChange = (questionId, optionId) => {
        setData((prevData) => ({
            ...prevData,
            answers: prevData.answers.map((a) =>
                a.questionId === questionId
                    ? { ...a, selectedOption: optionId }
                    : a
            ),
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitExam = () => {
        post(route("exams.submit", course.id));
    };

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = data.answers.find(
        (a) => a.questionId === currentQuestion.id
    )?.selectedOption;

    return (
        <AuthenticatedLayout>
            <Head title="Exam" />
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-700">
                        {course.course_title} Exam
                    </h1>
                </div>

                {/* Main Content */}
                <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
                    <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg text-indigo-600 font-semibold mb-4">
                                Question {currentQuestionIndex + 1} of{" "}
                                {questions.length}
                            </h2>
                            <p className="text-gray-700 text-xl font-medium mb-6 leading-relaxed">
                                Q. {currentQuestion.question_text}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <img
                                src={image}
                                alt="Exam"
                                className="rounded-2xl w-full max-w-md mx-auto mt-8"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 w-full md:w-[40%] p-8 flex flex-col justify-center">
                        <p className="uppercase tracking-widest text-xs text-gray-400 mb-4">
                            Choose one
                        </p>
                        <div className="space-y-4">
                            {currentQuestion.options.map((option) => {
                                const isSelected = currentAnswer === option.id;
                                return (
                                    <label
                                        key={option.id}
                                        className={`flex items-center border-2 p-4 rounded-2xl cursor-pointer transition-all ${
                                            isSelected
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            checked={isSelected}
                                            onChange={() =>
                                                handleOptionChange(
                                                    currentQuestion.id,
                                                    option.id
                                                )
                                            }
                                            className="mr-4 w-5 h-5 text-green-500 accent-green-600"
                                        />
                                        <span className="text-gray-700 font-medium text-sm md:text-base">
                                            {option.option_text}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-4 mt-10">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`px-6 py-3 rounded-full font-semibold transition-all ${
                            currentQuestionIndex === 0
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-indigo-500 hover:bg-indigo-600 text-white"
                        }`}
                    >
                        Previous
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={handleSubmitExam}
                            disabled={processing}
                            className="px-8 py-3 rounded-full font-semibold bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 transition-all"
                        >
                            {processing ? "Submitting..." : "Finish"}
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="px-8 py-3 rounded-full font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition-all"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CourseExam;
