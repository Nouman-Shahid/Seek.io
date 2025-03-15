import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

const SearchedResults = ({ results = [], count }) => {
    return (
        <AuthenticatedLayout>
            <div className="max-w-5xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Search Results ({count})
                </h2>
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((item, index) => (
                            <div
                                key={index}
                                className="border rounded-lg shadow-lg p-4 bg-white"
                            >
                                {/* If it's a course */}
                                {item.type === "course" ? (
                                    <>
                                        <img
                                            src={
                                                item.image ||
                                                "https://via.placeholder.com/300"
                                            }
                                            alt={item.name}
                                            className="w-full h-40 object-cover rounded-lg mb-3"
                                        />
                                        <h3 className="text-lg font-semibold">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {item.description ||
                                                "No description available."}
                                        </p>
                                        <div className="flex justify-between items-center mt-3">
                                            <span className="text-yellow-500 font-bold">
                                                ⭐ {item.rating || "4.5"}
                                            </span>
                                            <span className="text-green-600 font-bold">
                                                ${item.price || "Free"}
                                            </span>
                                        </div>
                                        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                            View Course
                                        </button>
                                    </>
                                ) : (
                                    // If it's a user
                                    <>
                                        <img
                                            src={
                                                item.name ||
                                                "https://via.placeholder.com/100"
                                            }
                                            alt={item.name}
                                            className="w-20 h-20 rounded-full mx-auto mb-3"
                                        />
                                        <h3 className="text-lg font-semibold text-center">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-500 text-center">
                                            {item.email}
                                        </p>
                                        <button className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800">
                                            View Profile
                                        </button>
                                    </>
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
        </AuthenticatedLayout>
    );
};

export default SearchedResults;
