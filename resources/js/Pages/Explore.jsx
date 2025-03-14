import React from "react";
import { Head, Link } from "@inertiajs/react";
import { FaSearch, FaStar, FaQuoteLeft } from "react-icons/fa";
import instructorImg from "../images/assets/role.png";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
const ExploreCourses = () => {
    const courses = [
        {
            title: "Science of Well-Being",
            price: "PKR 3000",
            rating: 4.7,
            bgColor: "",
            emoji: "😊",
        },
        {
            title: "Market Research and Insights",
            price: "PKR 3500",
            rating: 4.8,
            bgColor: "",
            emoji: "📊",
        },
        {
            title: "UX/UI Design for Product Managers",
            price: "PKR 4000",
            rating: 4.9,
            bgColor: "",
            emoji: "🎨",
        },
    ];

    const instructors = [
        {
            name: "Stephen Clark",
            role: "Marketing Expert",
            description:
                "A seasoned marketing strategist with over 10 years of experience in market research and brand growth.",
            img: instructorImg,
        },
        {
            name: "Emma Sophie",
            role: "UI/UX Designer",
            description:
                "Passionate about crafting intuitive user experiences, with expertise in wireframing and user research.",
            img: instructorImg,
        },
        {
            name: "Sara Johnson",
            role: "Product Manager",
            description:
                "Specializes in agile product development, helping teams build customer-focused solutions.",
            img: instructorImg,
        },
        {
            name: "Jane Clear",
            role: "Data Scientist",
            description:
                "Expert in data analysis, AI, and machine learning, transforming raw data into actionable insights.",
            img: instructorImg,
        },
    ];
    const courses1 = [
        {
            title: "Science of Well-Being",
            date: "1 - 18 March 2025",
            description:
                "Product Management Masterclass, with guest Sarah Johnson - Head of Product Customer Platform @ Seekio",
            color: "bg-blue-100",
            image: "😊",
        },
        {
            title: "Market Research and Customer Insights",
            date: "1 - 28 July 2025",
            description:
                "Mastering how to gather and analyze customer feedback to build better products.",
            color: "bg-yellow-100",
            image: "📊",
        },
        {
            title: "UX/UI Design for Product Managers",
            date: "Upcoming",
            description:
                "Learn the basics of user experience and interface design for product development.",
            color: "bg-purple-100",
            image: "🤝",
        },
    ];

    const testimonials = [
        {
            name: "John Doe",
            feedback:
                "Seekio has transformed the way I learn. The instructors are amazing, and the courses are well-structured!",
            rating: 5,
        },
        {
            name: "Sarah Williams",
            feedback:
                "Highly recommend! The content is top-notch, and the interactive learning experience keeps me engaged.",
            rating: 4.8,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Explore" />

            <div className="max-w-6xl mx-auto p-6 py-20">
                {/* Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                            Unlock Your Potential with Expert Courses and Tests
                        </h1>
                        <p className="text-gray-600 text-lg mt-2">
                            From critical skills to technical topics, Seekio
                            supports your professional development.
                        </p>
                        {/* Search Bar */}
                        <div className="mt-6 flex justify-center md:justify-start">
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search for anything..."
                                    className="w-full py-3 px-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                                />
                                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    {/* Hero Image */}
                    <div className="flex justify-center">
                        <img
                            src={instructorImg}
                            alt="Explore Courses"
                            className="w-full max-h-96 max-w-md rounded-2xl shadow-lg"
                        />
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {courses1.map((course, index) => (
                        <div
                            key={index}
                            className={`${course.color} p-5 rounded-lg shadow-md`}
                        >
                            <div className="text-4xl">{course.image}</div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-3">
                                {course.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {course.date}
                            </p>
                            <p className="text-gray-700 text-sm mt-2">
                                {course.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Popular Instructors */}
                <h2 className="text-3xl font-bold mt-16 text-center">
                    Popular Instructors
                </h2>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {instructors.map((instructor, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg p-6 rounded-lg text-center"
                        >
                            <img
                                src={instructor.img}
                                alt={instructor.name}
                                className="w-24 h-24 rounded-full mx-auto mb-3"
                            />
                            <p className="font-bold text-lg">
                                {instructor.name}
                            </p>
                            <p className="text-gray-600">{instructor.role}</p>
                            <p className="text-gray-500 text-sm mt-2">
                                {instructor.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Popular Courses */}
                <h2 className="text-3xl font-bold mt-16 text-center">
                    Popular Courses
                </h2>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className={`${course.bgColor} p-6 rounded-lg shadow-lg`}
                        >
                            <div className="text-5xl">{course.emoji}</div>
                            <h3 className="font-bold mt-3 text-xl">
                                {course.title}
                            </h3>
                            <div className="flex items-center mt-2">
                                <FaStar className="text-yellow-500" />
                                <span className="ml-1 text-lg">
                                    {course.rating}
                                </span>
                            </div>
                            <p className="text-green-600 font-bold mt-2 text-lg">
                                {course.price}
                            </p>
                            <button className="bg-blue-500 text-white w-full mt-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Testimonials Section */}
                <h2 className="text-3xl font-bold mt-16 text-center">
                    What Our Students Say
                </h2>
                <div className="mt-6 flex flex-col md:flex-row gap-6">
                    {testimonials.map((review, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 p-6 rounded-lg shadow-md flex-1"
                        >
                            <FaQuoteLeft className="text-gray-400 text-2xl mb-2" />
                            <p className="text-gray-700">{review.feedback}</p>
                            <p className="mt-4 font-bold">{review.name}</p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 bg-blue-500 text-white py-10 text-center rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold">Join Seekio Today!</h2>
                    <p className="mt-2 text-lg">
                        Start learning from industry experts now.
                    </p>
                    <button className="bg-white text-blue-500 font-bold px-6 py-2 rounded-lg mt-4">
                        Get Started
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ExploreCourses;
