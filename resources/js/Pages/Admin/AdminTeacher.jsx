import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import React from "react";

const AdminTeacher = ({ teachers = [] }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8 ml-64">
                <h1 className="text-3xl font-bold mb-6">Teachers</h1>
                <div className="overflow-x-auto bg-white shadow rounded-xl">
                    <table className="min-w-full table-auto text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Preference</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4">Email Verified</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {teachers.map((teacher, idx) => (
                                <tr
                                    key={idx}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <Link
                                            className="hover:underline"
                                            href={`/user/${teacher.id}`}
                                        >
                                            {teacher.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {teacher.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {teacher.preference || "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {teacher.address || "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {teacher.email_verified_at
                                            ? new Date(
                                                  teacher.email_verified_at
                                              ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "Not Verified"}
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

export default AdminTeacher;
