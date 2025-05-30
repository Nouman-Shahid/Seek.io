import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

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

            <section className="bg-white min-h-screen pt-16 px-6 sm:px-10 lg:px-24 transition-all">
                <div className="max-w-5xl mx-auto text-center mb-14">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
                        Get answers to common questions about Seekio's platform,
                        courses, and how we support your journey.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl transition-shadow duration-300 ${
                                openIndex === index
                                    ? "shadow-md border-blue-500"
                                    : "shadow-sm border-gray-200"
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center px-6 py-5 bg-blue-50 text-left text-blue-800 font-semibold text-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.question}</span>
                                <FaChevronDown
                                    className={`ml-4 transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180" : ""
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

            <Footer />
        </>
    );
}
