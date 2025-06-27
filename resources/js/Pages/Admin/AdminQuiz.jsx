import Sidebar from "@/Components/Sidebar";
import { Head, router, useForm } from "@inertiajs/react";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";

const AdminQuiz = ({ quizzes }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, reset, post } = useForm({
        title: "",
        question: "",
        option: "",
        category: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/store/daily-quiz", {
            title: data.title,
            question: data.question,
            option: data.option,
            category: data.category,
        });
    };

    return (
        <div>
            <Head title="Admin Quiz" />
            <div className="flex min-h-[99vh]">
                <Sidebar />
                <main className="flex-1 p-8 ml-64">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Make Quizzes
                        </h1>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-gray-800 py-2 px-4 text-white rounded-md hover:bg-gray-700 transition"
                        >
                            Add Quiz
                        </button>
                    </div>

                    {quizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {quizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
                                >
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                        {quiz.title}
                                    </h2>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-medium">
                                            Question:
                                        </span>{" "}
                                        {quiz.question}
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        <span className="font-medium">
                                            Option:
                                        </span>{" "}
                                        {quiz.options}
                                    </p>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                            {quiz.category}
                                        </span>

                                        <button
                                            title="delete"
                                            onClick={() =>
                                                router.visit(
                                                    `/remove-quiz/${quiz.id}`
                                                )
                                            }
                                        >
                                            <Trash2Icon className="size-4 text-gray-500 hover:text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-lg mt-20">
                            No quizzes available. Please add one.
                        </div>
                    )}
                </main>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4"
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Create New Quiz
                        </h2>

                        <input
                            type="text"
                            placeholder="Quiz Title"
                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Quiz Question"
                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.question}
                            onChange={(e) =>
                                setData("question", e.target.value)
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Quiz Option"
                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.option}
                            onChange={(e) => setData("option", e.target.value)}
                            required
                        />

                        <select
                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                            required
                        >
                            <option value="It">IT</option>
                            <option value="Business">Business</option>
                            <option value="Science">Science</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Other">Other</option>
                        </select>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    reset();
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save Quiz
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminQuiz;
