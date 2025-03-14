import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
    {
        question: "What types of courses does Seekio offer?",
        answer: "Seekio offers a wide range of courses tailored to the IT sector, including software development, data science, cybersecurity, cloud computing, and more. Each course is designed to equip students with industry-relevant skills and practical knowledge.",
    },
    {
        question: "Are Seekio’s certificates recognized in the IT industry?",
        answer: "Yes, Seekio’s certificates are widely recognized and valued by IT professionals and companies.",
    },
    {
        question: "How do I enroll in a course?",
        answer: "You can enroll in a course by signing up on Seekio’s platform, selecting your preferred course, and completing the enrollment process.",
    },
    {
        question: "What support is available if I need help during my course?",
        answer: "Seekio provides dedicated support through forums, mentors, and live Q&A sessions to assist students throughout their learning journey.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <AuthenticatedLayout>
            <div className="pt-20 relative bg-cover bg-center bg-no-repeat py-20 px-6">
                <div className=""></div>

                {/* FAQ Content */}
                <div className="relative max-w-6xl mx-auto text-white">
                    <h2 className="text-4xl font-bold mb-8  text-black">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-white bg-opacity-90 rounded-2xl overflow-hidden shadow-md ${
                                    openIndex === index
                                        ? "ring-2 ring-purple-600"
                                        : ""
                                }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center p-6 text-gray-900 font-semibold text-lg bg-gray-100 hover:bg-gray-200 transition-all"
                                >
                                    <span>{faq.question}</span>
                                    <FaChevronDown
                                        className={`transition-transform transform ${
                                            openIndex === index
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />
                                </button>
                                {openIndex === index && (
                                    <div className="p-6 text-gray-700 text-md leading-relaxed bg-white">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
