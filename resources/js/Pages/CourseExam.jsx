import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const CourseExam = ({ course, questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [examCancelled, setExamCancelled] = useState(false);

    const totalExamTime = questions.length * 60; // Total time in seconds
    const storageKey = "examStartTime";

    // Function to calculate the remaining time
    const calculateTimeLeft = () => {
        // Retrieve the saved exam start time from localStorage
        let examStartTime = localStorage.getItem(storageKey);

        // If no start time is set, initialize the exam start time
        if (!examStartTime) {
            examStartTime = Date.now().toString(); // Save current timestamp as start time
            localStorage.setItem(storageKey, examStartTime);
        }

        // Calculate elapsed time since the exam started (in seconds)
        const elapsed = Math.floor(
            (Date.now() - parseInt(examStartTime)) / 1000
        );
        const remaining = totalExamTime - elapsed;
        return Math.max(remaining, 0); // Ensure time doesn't go negative
    };

    useEffect(() => {
        // Initialize the time
        setTimeLeft(calculateTimeLeft());

        // Timer countdown logic
        const interval = setInterval(() => {
            const time = calculateTimeLeft();
            setTimeLeft(time);

            // If time is up, submit the exam
            if (time <= 0) {
                clearInterval(interval);
                handleSubmitExam();
            }
        }, 1000);

        // Handle visibility change (e.g., when the user switches tabs)
        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleCancelExam();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup function to clear the interval when the component is unmounted
        return () => {
            clearInterval(interval);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [questions.length]); // Re-run when the number of questions changes

    const handleOptionChange = (e, questionId) => {
        const updatedAnswers = [...answers];
        const answerIndex = updatedAnswers.findIndex(
            (answer) => answer.questionId === questionId
        );

        if (answerIndex === -1) {
            updatedAnswers.push({ questionId, answer: e.target.value });
        } else {
            updatedAnswers[answerIndex].answer = e.target.value;
        }

        setAnswers(updatedAnswers);
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
        alert("Exam submitted successfully!");
        localStorage.removeItem("examStartTime"); // Reset only on submit
        // Submit logic here (send answers to backend)
        window.location.href = "/dashboard";
    };

    const handleCancelExam = () => {
        if (!examCancelled) {
            alert("Exam cancelled due to tab switch.");
            setExamCancelled(true);
            localStorage.removeItem("examStartTime");
            window.location.href = "/dashboard"; // Redirect user
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <AuthenticatedLayout>
            <div className="flex min-h-screen flex-col p-8">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">
                        {course.course_title} Exam
                    </p>
                    <p className="text-red-500 font-bold">
                        Timer: {formatTime(timeLeft)}
                    </p>
                </div>

                <div className="question-container mt-4">
                    <p className="font-semibold">
                        {questions[currentQuestionIndex].question_text}
                    </p>
                    <form className="mt-2">
                        {questions[currentQuestionIndex].options.map(
                            (option, index) => (
                                <div key={index} className="mb-2">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${questions[currentQuestionIndex].id}`}
                                            value={option.id}
                                            checked={answers.some(
                                                (answer) =>
                                                    answer.questionId ===
                                                        questions[
                                                            currentQuestionIndex
                                                        ].id &&
                                                    answer.answer === option.id
                                            )}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    e,
                                                    questions[
                                                        currentQuestionIndex
                                                    ].id
                                                )
                                            }
                                        />
                                        {option.option_text}
                                    </label>
                                </div>
                            )
                        )}
                    </form>
                </div>

                <div className="navigation-buttons mt-4 flex justify-between">
                    <button
                        onClick={handlePreviousQuestion}
                        className="px-4 py-2 bg-gray-300 rounded"
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={handleSubmitExam}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Submit Exam
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
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
