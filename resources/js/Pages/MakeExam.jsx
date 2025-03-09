import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function MakeExam() {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, reset } = useForm({
        questions: [],
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: "1",
    });

    // Handle input changes
    const handleChange = (e, index = null) => {
        if (index !== null) {
            let newOptions = [...data.options];
            newOptions[index] = e.target.value;
            setData("options", newOptions);
        } else {
            setData(e.target.name, e.target.value);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setData("questions", [
            ...data.questions,
            {
                question: data.question,
                options: data.options,
                correctAnswer: data.correctAnswer,
                marks: data.marks,
            },
        ]);
        reset("question", "options", "correctAnswer", "marks"); // Reset form fields
        setShowForm(false);
    };

    const saveExam = () => {
        // post(route("exams.store"));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold">Create Exam</h1>

            <div className="flex justify-between my-4">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                    Add Question
                </button>
                <button
                    onClick={saveExam}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Save Exam
                </button>
            </div>

            {/* Question List */}
            <div className="space-y-4">
                {data.questions.map((q, i) => (
                    <div
                        key={i}
                        className="border p-4 rounded-md bg-white shadow-md"
                    >
                        <h2 className="font-semibold">
                            {i + 1}. {q.question}
                        </h2>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {q.options.map((opt, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2 border rounded-md ${
                                        opt === q.correctAnswer
                                            ? "bg-green-100 border-green-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {String.fromCharCode(65 + idx)}) {opt}
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-600 mt-2">
                            <b>Right Answer:</b> {q.correctAnswer} |{" "}
                            <b>Marks:</b> {q.marks}
                        </p>
                    </div>
                ))}
            </div>

            {/* Question Form */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h2 className="text-xl font-bold">Add Question</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                name="question"
                                value={data.question}
                                onChange={handleChange}
                                placeholder="Enter question..."
                                className="border p-2 w-full rounded-md my-2"
                                required
                            />
                            {data.options.map((opt, index) => (
                                <input
                                    key={index}
                                    value={opt}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder={`Option ${String.fromCharCode(
                                        65 + index
                                    )}`}
                                    className="border p-2 w-full rounded-md my-2"
                                    required
                                />
                            ))}
                            <select
                                name="correctAnswer"
                                value={data.correctAnswer}
                                onChange={handleChange}
                                className="border p-2 w-full rounded-md my-2"
                                required
                            >
                                <option value="">Select Correct Answer</option>
                                {data.options.map((opt, index) => (
                                    <option key={index} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                name="marks"
                                value={data.marks}
                                onChange={handleChange}
                                className="border p-2 w-full rounded-md my-2"
                                required
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
