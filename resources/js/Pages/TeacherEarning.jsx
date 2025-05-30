import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const TeacherEarning = ({ TeacherWallet = {}, Enrollments = [] }) => {
    const enrollmentsByMonth = {};

    Enrollments.forEach((enrollment) => {
        const month = new Date(enrollment.enrollment_date).toLocaleString(
            "default",
            { year: "numeric", month: "short" }
        );
        enrollmentsByMonth[month] = (enrollmentsByMonth[month] || 0) + 1;
    });

    const enrollmentsData = Object.keys(enrollmentsByMonth).map((month) => ({
        month,
        enrollments: enrollmentsByMonth[month],
    }));

    return (
        <AuthenticatedLayout>
            <Head title="Earnings" />

            <div className="min-h-screen p-6 bg-white">
                {/* Page Header */}
                <h1 className="text-3xl font-bold text-blue-800 mb-6">
                    Teacher Dashboard – Earnings & Enrollments
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Section */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-5 rounded-2xl shadow">
                                <p className="text-sm text-blue-800 font-medium">
                                    Total Earnings
                                </p>
                                <p className="text-2xl font-bold text-blue-900 mt-1">
                                    PKR {TeacherWallet?.total_amount || "0"}
                                </p>
                            </div>

                            <div className="bg-blue-100 p-5 rounded-2xl shadow">
                                <p className="text-sm text-blue-800 font-medium">
                                    Top Selling Course
                                </p>
                                <p className="text-lg font-semibold text-blue-900 mt-1">
                                    Course Name
                                </p>
                            </div>
                        </div>

                        {/* Enrollments Chart */}
                        <div className="bg-white border border-blue-100 p-6 rounded-2xl shadow">
                            <h2 className="text-lg font-semibold text-blue-800 mb-4">
                                Student Enrollments Over Time
                            </h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={enrollmentsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" stroke="#3b82f6" />
                                    <YAxis
                                        stroke="#3b82f6"
                                        allowDecimals={false}
                                    />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="enrollments"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-blue-50 p-6 rounded-2xl shadow">
                            <h2 className="text-lg font-semibold text-blue-800 mb-4">
                                Withdrawal & Balance
                            </h2>
                            <div className="bg-blue-100 p-4 rounded-xl mb-4">
                                <p className="text-sm text-blue-700">
                                    Current Balance
                                </p>
                                <p className="text-2xl font-bold text-blue-900 mt-1">
                                    PKR {TeacherWallet?.total_amount || "0"}
                                </p>
                            </div>
                            <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 rounded-lg transition duration-300">
                                Withdraw Funds
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TeacherEarning;
