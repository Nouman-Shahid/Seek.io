import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import ExamForm from "./ExamForm";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons

const MakeExam = ({ course, questions }) => {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [openQuestionId, setOpenQuestionId] = useState(null);

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const { data, setData, post, processing } = useForm({
        question_id: "",
        question_text: "",
        options: [],
        correctAnswerIndex: null,
    });

    const toggleAccordion = (id) => {
        setOpenQuestionId(openQuestionId === id ? null : id);
    };

    const handleEdit = (question) => {
        setCurrentQuestion(question);
        setData({
            question_id: question.id,
            question_text: question.question_text,
            options: question.options.map((opt) => opt.option_text),
            correctAnswerIndex: question.options.findIndex(
                (opt) => opt.is_correct
            ),
        });
        setEditModal(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        post(`/exam_question/update/${data.question_id}`),
            {
                onSuccess: () => setEditModal(false),
            };
    };

    return (
        <AuthenticatedLayout>
            <Head title="Make Exam" />

            <div className="flex w-full min-h-screen  ">
                {/* Main Content */}
                <div className="w-[70%] mx-auto my-20 p-8 bg-white shadow-lg rounded-lg ">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Exam Questions
                            {questions.length >= 5 ? (
                                ""
                            ) : (
                                <span className="text-red-500 text-sm mx-3">
                                    {" "}
                                    (At least 5 questions in order to save the
                                    exam)
                                </span>
                            )}
                        </h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all shadow-md"
                            >
                                + Add New Question
                            </button>
                            {questions.length >= 5 ? (
                                <Link
                                    href=""
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all shadow-md"
                                >
                                    Save Exam
                                </Link>
                            ) : (
                                <p className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-md transition-all shadow-md cursor-not-allowed">
                                    Save Exam
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Questions List - Accordion */}
                    {questions.length > 0 ? (
                        <div className="space-y-4">
                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className="border border-gray-200 rounded-lg shadow-sm transition-all"
                                >
                                    {/* Accordion Header */}
                                    <div
                                        className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg cursor-pointer hover:bg-gray-200"
                                        onClick={() =>
                                            toggleAccordion(question.id)
                                        }
                                    >
                                        <h3 className="text-lg font-semibold text-gray-700">
                                            {index + 1}.{" "}
                                            {question.question_text}
                                        </h3>
                                        {openQuestionId === question.id ? (
                                            <FaChevronUp className="text-gray-600" />
                                        ) : (
                                            <FaChevronDown className="text-gray-600" />
                                        )}
                                    </div>

                                    {/* Accordion Body (Options) */}
                                    {openQuestionId === question.id && (
                                        <div className="p-4 bg-white border-t border-gray-200">
                                            <ol className="space-y-2 list-decimal">
                                                {question.options.map(
                                                    (option) => (
                                                        <li
                                                            key={option.id}
                                                            className={`flex items-center px-3 py-2 rounded-md ${
                                                                option.is_correct
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-gray-100 text-gray-700"
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`question_${question.id}`}
                                                                disabled
                                                                checked={
                                                                    option.is_correct
                                                                }
                                                                className="mr-2"
                                                            />
                                                            {option.option_text}
                                                        </li>
                                                    )
                                                )}
                                            </ol>

                                            {/* Edit Button */}
                                            <div className="text-right mt-3">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(question)
                                                    }
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">
                            No questions available for this exam.
                        </p>
                    )}
                </div>

                <div className="flex w-[20%] bg-blue-500 "></div>
            </div>

            <ExamForm
                course={course}
                showModal={showModal}
                setShowModal={setShowModal}
            />

            {/* Edit Question Modal */}
            {editModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">
                            Edit Question
                        </h2>
                        <form onSubmit={handleUpdate}>
                            <label className="block text-gray-700 font-medium mb-2">
                                Question
                            </label>
                            <input
                                type="text"
                                value={data.question_text}
                                onChange={(e) =>
                                    setData("question_text", e.target.value)
                                }
                                className="w-full border px-3 py-2 rounded-md mb-4"
                            />

                            <label className="block text-gray-700 font-medium mb-2">
                                Options
                            </label>
                            {data.options.map((option, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 mb-2"
                                >
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        checked={
                                            data.correctAnswerIndex === index
                                        }
                                        onChange={() =>
                                            setData("correctAnswerIndex", index)
                                        }
                                    />
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => {
                                            const newOptions = [
                                                ...data.options,
                                            ];
                                            newOptions[index] = e.target.value;
                                            setData("options", newOptions);
                                        }}
                                        className="border px-2 py-1 rounded-md w-full"
                                    />
                                </div>
                            ))}

                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditModal(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default MakeExam;
