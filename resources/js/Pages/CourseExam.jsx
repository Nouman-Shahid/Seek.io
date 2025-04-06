import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

const CourseExam = ({ course, questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [examCancelled, setExamCancelled] = useState(false);

    // Initialize with proper array structure and type safety
    const { data, setData, post, processing, errors } = useForm({
        answers: Array.isArray(questions)
            ? questions.map((question) => ({
                  questionId: question.id,
                  selectedOption: null,
              }))
            : [],
    });

    const totalExamTime = questions.length * 60;
    const storageKey = "examStartTime";

    const calculateTimeLeft = () => {
        let examStartTime = localStorage.getItem(storageKey);
        if (!examStartTime) {
            examStartTime = Date.now().toString();
            localStorage.setItem(storageKey, examStartTime);
        }
        const elapsed = Math.floor(
            (Date.now() - parseInt(examStartTime)) / 1000
        );
        return Math.max(totalExamTime - elapsed, 0);
    };

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const interval = setInterval(() => {
            const time = calculateTimeLeft();
            setTimeLeft(time);
            if (time <= 0) {
                clearInterval(interval);
                handleSubmitExam();
            }
        }, 1000);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleCancelExam();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [questions.length]);

    const handleOptionChange = (questionId, optionId) => {
        setData("answers", (prevAnswers) => {
            // Ensure we're always working with an array
            const safeAnswers = Array.isArray(prevAnswers) ? prevAnswers : [];
            return safeAnswers.map((answer) =>
                answer.questionId === questionId
                    ? { ...answer, selectedOption: optionId }
                    : answer
            );
        });
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
        post(route("exams.submit", course.id), {
            preserveScroll: true,
            onSuccess: () => {
                localStorage.removeItem(storageKey);
            },
        });
    };

    const handleCancelExam = () => {
        if (!examCancelled) {
            alert("Exam cancelled due to tab switch.");
            setExamCancelled(true);
            localStorage.removeItem(storageKey);
            window.location.href = "/dashboard";
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const currentQuestion = questions[currentQuestionIndex];

    // Safely get the current answer with multiple fallbacks
    const currentAnswer = (() => {
        try {
            if (!Array.isArray(data.answers)) return null;
            const answer = data.answers.find(
                (a) => a?.questionId === currentQuestion.id
            );
            return answer?.selectedOption ?? null;
        } catch (error) {
            console.error("Error finding answer:", error);
            return null;
        }
    })();

    return (
        <AuthenticatedLayout>
            <div className="flex min-h-screen flex-col p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {course.course_title} Exam
                    </h1>
                    <div className="text-red-500 font-bold text-lg">
                        Time Remaining: {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Question {currentQuestionIndex + 1} of{" "}
                        {questions.length}
                    </h2>
                    <p className="mb-6 text-lg">
                        {currentQuestion.question_text}
                    </p>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                            <div key={option.id} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`option-${currentQuestion.id}-${option.id}`}
                                    name={`question-${currentQuestion.id}`}
                                    value={option.id}
                                    checked={currentAnswer === option.id}
                                    onChange={() =>
                                        handleOptionChange(
                                            currentQuestion.id,
                                            option.id
                                        )
                                    }
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={`option-${currentQuestion.id}-${option.id}`}
                                    className="ml-3 block text-md text-gray-700"
                                >
                                    {option.option_text}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-between">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`px-6 py-2 rounded-md ${
                            currentQuestionIndex === 0
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        Previous
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={handleSubmitExam}
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? "Submitting..." : "Submit Exam"}
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
