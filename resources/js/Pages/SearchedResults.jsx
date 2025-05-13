import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, Link } from "@inertiajs/react";
import image from "../images/assets/loading.png";
import Navbar from "@/Components/Navbar";
const SearchedResults = ({ results = [], count, auth }) => {
    return (
        <>
            <Navbar auth={auth} />
            <Head title="Searched Results" />
            <div className="flex w-full">
                <div className="w-[75%] p-6">
                    <h2 className="text-2xl font-bold  mb-4">
                        Search Results ({count})
                    </h2>
                    {results.length > 0 ? (
                        <div className="flex flex-col space-y-4">
                            {results.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg shadow-lg p-4 bg-white flex hover:bg-blue-50 space-x-5"
                                >
                                    {/* If its a course */}
                                    {item.type === "course" ? (
                                        <>
                                            <img
                                                src={
                                                    item.image ||
                                                    "https://via.placeholder.com/300"
                                                }
                                                alt={item.name}
                                                className="w-52 h-52 object-cover rounded-lg mb-3"
                                            />
                                            <div className="flex flex-col flex-grow space-y-5">
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {item.name}
                                                </h3>
                                                {item.type === "course" ? (
                                                    <>
                                                        <p className="text-gray-600 text-sm">
                                                            {item.description ||
                                                                "No description available."}
                                                        </p>
                                                        <span className="text-yellow-500 font-bold">
                                                            ⭐{" "}
                                                            {item.course_rating ||
                                                                "4.5"}
                                                        </span>
                                                        <span className="text-green-600 font-bold">
                                                            PKR{" "}
                                                            {item.price ||
                                                                "Free"}
                                                        </span>
                                                        <div className="flex justify-end">
                                                            <Link
                                                                href={`/course/id/${item.id}`}
                                                                className="px-3 py-2 bg-green-600 text-white rounded-md transition-all duration-300 hover:bg-green-700"
                                                            >
                                                                View Courses
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-gray-500">
                                                            {item.email}
                                                        </p>
                                                        <button className="mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all self-start">
                                                            View Profile
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        // If it's a user
                                        <div className="w-[80%] h-28 bg-white rounded-xl shadow-lg p-4 flex items-center border border-gray-200">
                                            <img
                                                src={item.profile_image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-md"
                                            />
                                            <div className="ml-4 flex-1">
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    {item.name}
                                                </h3>

                                                <p className="mt-2 text-gray-500 text-sm line-clamp-2 overflow-hidden">
                                                    {item.profile_headline}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/user/${item.id}`}
                                                className="ml-4 bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-900"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">
                            No results found.
                        </p>
                    )}
                </div>
                <div className="flex w-[25%]">
                    <img src={image} alt="" />
                </div>
            </div>
        </>
    );
};

export default SearchedResults;
