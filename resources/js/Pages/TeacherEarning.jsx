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

            <div className="min-h-screen p-6 ">
                {/* Header */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    View your earnings, track payout history, and withdraw funds
                    easily.
                </h1>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Section */}
                    <div className="col-span-8 p-6 bg-white shadow-lg rounded-lg">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Total Earnings */}
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-gray-600">Total Earnings</p>
                                <p className="text-green-500 text-2xl font-semibold">
                                    PKR{" "}
                                    {TeacherWallet && TeacherWallet.total_amount
                                        ? TeacherWallet.total_amount
                                        : "0"}
                                </p>
                            </div>
                            {/* Top Selling Course */}
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-gray-600">
                                    Top Selling Course
                                </p>
                                <p className="text-blue-500 text-xl font-semibold">
                                    Course Name
                                </p>
                            </div>
                        </div>

                        {/* Enrollments Chart */}
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Student Enrollments Over Time
                            </h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={enrollmentsData}>
                                    <XAxis dataKey="month" stroke="#8884d8" />
                                    <YAxis
                                        stroke="#82ca9d"
                                        allowDecimals={false}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="enrollments"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="col-span-4 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Withdrawal & Balance
                        </h2>
                        <div className="p-4 bg-yellow-50 rounded-lg mb-4">
                            <p className="text-gray-600">Current Balance</p>
                            <p className="text-yellow-500 text-2xl font-semibold">
                                PKR{" "}
                                {TeacherWallet && TeacherWallet.total_amount
                                    ? TeacherWallet.total_amount
                                    : "0"}
                            </p>
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                            Withdraw Funds
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TeacherEarning;
