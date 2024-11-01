import React from "react";
import Sidebar from "@/Components/Sidebar";
import { Users, GraduationCap, BookOpen, ClipboardList } from "lucide-react";

const stats = [
    {
        label: "Students",
        icon: <Users size={28} />,
        key: "studentCount",
        bg: "bg-black",
    },
    {
        label: "Teachers",
        icon: <GraduationCap size={28} />,
        key: "teacherCount",
        bg: "bg-red-700",
    },
    {
        label: "Courses",
        icon: <BookOpen size={28} />,
        key: "courseCount",
        bg: "bg-blue-900",
    },
    {
        label: "Enrollments",
        icon: <ClipboardList size={28} />,
        key: "enrollmentCount",
        bg: "bg-yellow-700",
    },
];

const AdminDashboard = ({
    studentCount,
    teacherCount,
    courseCount,
    enrollmentCount,
}) => {
    const values = { studentCount, teacherCount, courseCount, enrollmentCount };

    return (
        <div className="min-h-screen bg-gray-100 lg:pl-64">
            <Sidebar />

            <main className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item) => (
                        <div
                            key={item.key}
                            className={`flex items-center p-4 rounded-2xl shadow-sm border bg-white`}
                        >
                            <div
                                className={`p-3 rounded-full text-white ${item.bg}  mr-4 shadow`}
                            >
                                {item.icon}
                            </div>
                            <div>
                                <p className={`text-sm font-medium text-black`}>
                                    {item.label}
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {values[item.key]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
