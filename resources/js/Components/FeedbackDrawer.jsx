import { X } from "lucide-react";
import { router, useForm } from "@inertiajs/react";
import { MdDelete, MdRemove } from "react-icons/md";

export default function FeedbackDrawer({
    isOpen,
    onClose,
    feedbacks,
    courseId,
    auth,
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        course_id: courseId,
        rating: "",
        comment: "",
    });

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();

        post("/feedbacks", {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const ratings = [
        {
            label: "Bad",
            value: "1",
            imgSrc: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f61e/512.webp",
        },
        {
            label: "Average",
            value: "3",
            imgSrc: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f642/512.webp",
        },
        {
            label: "Good",
            value: "5",
            imgSrc: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.webp",
        },
    ];

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-end transition duration-300 ${
                isOpen ? "visible" : "invisible"
            }`}
        >
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
            ></div>

            <div
                className={`relative w-[90%] max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 flex flex-col ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ height: "100vh" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Course Feedback
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close feedback drawer"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="px-5 py-4 overflow-y-auto no-scrollbar flex-grow">
                    {feedbacks.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm mt-6 select-none">
                            No feedback available yet.
                        </p>
                    ) : (
                        feedbacks.map((feedback, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 mb-5 last:mb-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-gray-900 truncate max-w-xs sm:max-w-none">
                                            {feedback.user_name}
                                        </span>
                                        <span className="flex items-center text-yellow-500 text-sm font-semibold">
                                            <svg
                                                className="w-4 h-4 fill-current mr-1"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.955L10 0l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
                                            </svg>
                                            {(
                                                Number(feedback.rating) || 0
                                            ).toFixed(1)}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 whitespace-nowrap select-none">
                                        {new Date(
                                            feedback.created_at
                                        ).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {feedback.comment}
                                </p>

                                <div className="flex w-full justify-end">
                                    {feedback.user_id === auth?.user?.id && (
                                        <button
                                            onClick={() => {
                                                router.visit(
                                                    `/remove_feedback/${feedback.id}`
                                                );
                                            }}
                                        >
                                            <MdDelete className="text-red-500 bg-red-100 size-5 rounded-full" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Feedback Form */}
                {auth?.user?.role !== "Teacher" && (
                    <form
                        onSubmit={handleFeedbackSubmit}
                        className="px-5 py-4 border-t-2 border-gray-100 flex flex-col flex-shrink-0"
                        style={{ minHeight: "200px" }}
                    >
                        <div className="flex justify-center gap-8 mb-3">
                            {ratings.map(({ label, value, imgSrc }) => (
                                <button
                                    key={value}
                                    type="button"
                                    className={`flex flex-col items-center gap-1 transition-transform transform hover:scale-125 ${
                                        data.rating === value ? "scale-125" : ""
                                    }`}
                                    onClick={() => setData("rating", value)}
                                    aria-label={`Rate ${label}`}
                                    style={{ outline: "none" }}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={label}
                                        className="w-10 h-10 object-contain"
                                        draggable={false}
                                    />
                                    <span className="text-xs text-gray-700 font-medium select-none">
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {errors.rating && (
                            <p className="text-red-500 text-xs text-center mb-2">
                                {errors.rating}
                            </p>
                        )}

                        <textarea
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300 resize-none"
                            placeholder="Write your feedback here..."
                            value={data.comment}
                            onChange={(e) => setData("comment", e.target.value)}
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-xs mt-1 mb-2">
                                {errors.comment}
                            </p>
                        )}

                        {auth?.user?.role !== "Admin" && (
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-60"
                            >
                                {processing
                                    ? "Submitting..."
                                    : "Submit Feedback"}
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
