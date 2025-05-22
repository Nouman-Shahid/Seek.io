import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

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

export default function FAQ({ auth }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Navbar auth={auth} />
            <Head title="FAQ" />

            <section className="bg-white min-h-screen pt-8 px-6 sm:px-10 lg:px-20">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-4 text-gray-600 text-md sm:text-lg">
                        Get answers to common questions about Seekio's platform,
                        courses, and more.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-300 ${
                                openIndex === index
                                    ? "shadow-lg border-blue-500"
                                    : "shadow-sm"
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center bg-blue-50 px-6 py-5 text-left text-blue-800 font-medium text-lg hover:bg-blue-100 transition-colors"
                            >
                                <span>{faq.question}</span>
                                <FaChevronDown
                                    className={`transition-transform duration-300 ${
                                        openIndex === index
                                            ? "rotate-180"
                                            : "rotate-0"
                                    }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-5 bg-white text-gray-700 text-md leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
