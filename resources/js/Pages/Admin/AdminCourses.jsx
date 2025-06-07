import Sidebar from "@/Components/Sidebar";
import { Link, router } from "@inertiajs/react";
import React from "react";

const AdminCourses = ({ courses }) => {
    const courseData = courses?.data || [];
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8 ml-64">
                <h1 className="text-3xl font-bold mb-6">Courses</h1>
                <div className="overflow-x-auto bg-white shadow rounded-xl">
                    <table className="min-w-full table-auto text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Level</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Publish</th>
                                <th className="px-6 py-4">Rating</th>
                                <th className="px-6 py-4">Teacher</th>
                                <th className="px-6 py-4">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {courseData.map((course, idx) => (
                                <tr
                                    key={idx}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <Link
                                            href={`/course/id/${course.id}`}
                                            className="hover:underline "
                                        >
                                            {course.course_title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.course_category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.course_level}
                                    </td>
                                    <td className="px-6 py-4">
                                        PKR {course.course_amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={course.publish || "Draft"}
                                            onChange={(e) => {
                                                router.post(
                                                    `/admin/courses/${course.id}/status`,
                                                    {
                                                        status: e.target.value,
                                                    }
                                                );
                                            }}
                                            className={`text-xs text-center font-semibold rounded-full w-24 pr-6 py-1 border outline-none ${
                                                course.publish === "Published"
                                                    ? "bg-blue-100 text-blue-800 border-blue-300"
                                                    : course.publish ===
                                                      "Pending"
                                                    ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                                    : "bg-red-100 text-red-800 border-red-300"
                                            }`}
                                        >
                                            <option value="Published">
                                                Published
                                            </option>
                                            <option value="Pending">
                                                Pending
                                            </option>
                                            <option value="Draft">Draft</option>
                                        </select>
                                    </td>

                                    <td className="px-6 py-4">
                                        {course.course_rating}⭐
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/user/${course.course_teacher}`}
                                            className="hover:underline "
                                        >
                                            {course.course_teacher}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            course.created_at
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-1 flex-wrap">
                    {courses?.links?.map((link, index) => {
                        const totalLinks = courses.links.length;
                        const currentIndex = courses.links.findIndex(
                            (l) => l.active
                        );
                        const isPrevOrNext =
                            link.label.includes("Previous") ||
                            link.label.includes("Next");
                        const isInWindow =
                            index === 0 ||
                            index === totalLinks - 1 ||
                            isPrevOrNext ||
                            Math.abs(index - currentIndex) <= 1;
                        if (!isInWindow) return null;
                        return (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`px-3 py-1 rounded-md text-sm ${
                                    link.active
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                } ${
                                    !link.url &&
                                    "pointer-events-none opacity-50"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default AdminCourses;
