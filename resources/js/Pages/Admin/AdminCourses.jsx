import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import React from "react";

const AdminCourses = ({ courses = [] }) => {
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
                            {courses.map((course, idx) => (
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
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                                course.publish
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {course.publish
                                                ? "Published"
                                                : "Draft"}
                                        </span>
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
            </main>
        </div>
    );
};

export default AdminCourses;
