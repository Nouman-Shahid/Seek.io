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
        post(`/courses/${course.id}/exam/submit`);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = data.answers.find(
        (a) => a.questionId === currentQuestion.id
    )?.selectedOption;

    return (
        <AuthenticatedLayout>
            <Head title="Exam" />
            <div className="flex flex-col min-h-screen  p-4 sm:p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
                        {course.course_title} Exam
                    </h1>
                </div>

                <div className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden">
                    {/* Left Column */}
                    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-sm sm:text-base text-blue-800 font-semibold mb-4">
                                Question {currentQuestionIndex + 1} of{" "}
                                {questions.length}
                            </h2>
                            <p className="text-gray-800 text-lg sm:text-xl font-medium mb-6 leading-relaxed">
                                Q. {currentQuestion.question_text}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <img
                                src={image}
                                alt="Exam visual"
                                className="rounded-2xl w-full max-w-md mx-auto mt-6"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-gray-50 w-full md:w-[40%] p-6 sm:p-8 flex flex-col justify-center">
                        <p className="uppercase tracking-widest text-xs text-gray-500 mb-4">
                            Choose one
                        </p>
                        <div className="space-y-4">
                            {currentQuestion.options.map((option) => {
                                const isSelected = currentAnswer === option.id;
                                return (
                                    <label
                                        key={option.id}
                                        htmlFor={`option-${option.id}`}
                                        className={`flex items-center gap-3 border-2 p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                                            isSelected
                                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                        }`}
                                    >
                                        <input
                                            id={`option-${option.id}`}
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            checked={isSelected}
                                            onChange={() =>
                                                handleOptionChange(
                                                    currentQuestion.id,
                                                    option.id
                                                )
                                            }
                                            className="w-5 h-5 accent-blue-600"
                                            aria-checked={isSelected}
                                            aria-labelledby={`option-${option.id}`}
                                        />
                                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                                            {option.option_text}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-end items-center gap-4 mt-10">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`px-6 py-3 rounded-full font-semibold transition-all text-sm sm:text-base ${
                            currentQuestionIndex === 0
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-blue-700 hover:bg-blue-800 text-white"
                        }`}
                    >
                        Previous
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={handleSubmitExam}
                            disabled={processing}
                            className="px-8 py-3 rounded-full font-semibold bg-blue-700 hover:bg-blue-800 text-white disabled:opacity-50 transition-all text-sm sm:text-base"
                        >
                            {processing ? "Submitting..." : "Finish"}
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="px-8 py-3 rounded-full font-semibold bg-blue-700 hover:bg-blue-800 text-white transition-all text-sm sm:text-base"
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
