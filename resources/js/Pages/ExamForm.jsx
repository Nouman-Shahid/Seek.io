import React from "react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";

const ExamForm = ({ course, showModal, setShowModal }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        question: "",
        options: ["", "", "", ""],
        correctAnswerIndex: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/exam_question/store/${course.id}`, {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const updateOption = (index, value) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData("options", newOptions);
    };
    return (
        <>
            {showModal && (
                <form
                    onSubmit={submit}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90vw] md:w-[60vw] max-h-[90vh] overflow-y-auto relative">
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                        >
                            &times;
                        </button>

                        <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
                            Add Question
                        </h2>

                        {/* Question Input */}
                        <div className="mb-6">
                            <label className="block font-medium text-gray-700 mb-1">
                                Question
                            </label>
                            <TextInput
                                type="text"
                                value={data.question}
                                onChange={(e) =>
                                    setData("question", e.target.value)
                                }
                                className="w-full"
                                required
                                placeholder="Enter your question here..."
                            />
                            <InputError
                                message={errors.question}
                                className="mt-2"
                            />
                        </div>

                        {/* Options Inputs */}
                        <div className="mb-6">
                            <label className="block font-medium text-gray-700 mb-2">
                                Options{" "}
                                <span className="text-sm text-gray-500">
                                    (select the correct one)
                                </span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3"
                                    >
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={
                                                data.correctAnswerIndex ===
                                                index
                                            }
                                            onChange={() =>
                                                setData(
                                                    "correctAnswerIndex",
                                                    index
                                                )
                                            }
                                            className="form-radio text-blue-600"
                                        />
                                        <TextInput
                                            type="text"
                                            value={option}
                                            onChange={(e) =>
                                                updateOption(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                            required
                                            placeholder={`Option ${String.fromCharCode(
                                                65 + index
                                            )}`}
                                        />
                                    </div>
                                ))}
                                {errors.options && (
                                    <InputError
                                        message={errors.options}
                                        className="mt-2 col-span-2"
                                    />
                                )}
                                {errors.correctAnswerIndex && (
                                    <InputError
                                        message={errors.correctAnswerIndex}
                                        className="mt-2 col-span-2"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all font-semibold"
                            >
                                {processing
                                    ? "Submitting..."
                                    : "Submit Question"}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default ExamForm;
