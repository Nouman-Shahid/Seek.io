import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import image from "../images/assets/loading.png";

export default function SearchedResults({ results = [], count, auth }) {
    return (
        <>
            <Navbar auth={auth} />
            <Head title="Search Results" />

            <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
                {/* Main Content */}
                <div className="w-full lg:w-3/4 p-6 space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">
                        Showing {count} result{count !== 1 && "s"}
                    </h2>

                    {results.length > 0 ? (
                        <div className="space-y-6">
                            {results.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row p-5 gap-5"
                                >
                                    <img
                                        src={
                                            item.image ||
                                            item.profile_image ||
                                            "https://via.placeholder.com/300"
                                        }
                                        alt={item.name}
                                        className="w-full sm:w-48 h-48 object-cover rounded-xl"
                                    />

                                    <div className="flex-1 flex flex-col justify-between space-y-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {item.name}
                                            </h3>

                                            {item.type === "course" ? (
                                                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                                                    {item.description ||
                                                        "No description provided."}
                                                </p>
                                            ) : (
                                                <p className="text-gray-500 mt-1 text-sm line-clamp-2">
                                                    {item.profile_headline ||
                                                        "No headline available."}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {item.type === "course" ? (
                                                <div className="flex flex-col space-y-1">
                                                    <span className="text-yellow-500 text-sm font-medium">
                                                        ⭐{" "}
                                                        {item.course_rating ||
                                                            "4.5"}
                                                    </span>
                                                    <span className="text-green-600 font-semibold text-sm">
                                                        {item.price === 0 ||
                                                        item.price === "0"
                                                            ? "Free"
                                                            : `PKR ${item.price}`}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-gray-500">
                                                    {item.email}
                                                </div>
                                            )}

                                            <Link
                                                href={
                                                    item.type === "course"
                                                        ? `/course/id/${item.id}`
                                                        : `/user/${item.id}`
                                                }
                                                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition duration-300"
                                            >
                                                {item.type === "course"
                                                    ? "View Course"
                                                    : "View Profile"}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-lg mt-12">
                            No results found.
                        </div>
                    )}
                </div>

                {/* Fixed Side Image */}
                <div className="hidden lg:block w-1/4 h-screen sticky top-0">
                    <img
                        src={image}
                        alt="Search Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </>
    );
}
