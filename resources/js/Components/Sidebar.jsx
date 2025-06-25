import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    Globe,
    Menu,
    X,
    LogOut,
    Eye,
    GraduationCap,
    BookOpen,
} from "lucide-react";

const navItems = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard size={20} />,
    },
    {
        name: "Courses",
        href: "/admin/courses",
        icon: <BookOpen size={20} />,
    },
    { name: "Students", href: "/admin/students", icon: <Users size={20} /> },
    {
        name: "Teachers",
        href: "/admin/teachers",
        icon: <GraduationCap size={20} />,
    },

    { name: "Make Quiz", href: "/admin/quiz", icon: <Globe size={20} /> },
];

export default function Sidebar() {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <>
            <div className="lg:hidden px-4 py-3 bg-gray-900 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <button onClick={toggleMenu}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:block`}
            >
                <div className="h-full flex flex-col justify-between p-4 space-y-6">
                    <div>
                        <h2 className="text-xl font-bold px-2 mb-4 hidden lg:block">
                            Admin Panel
                        </h2>
                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-2 rounded-md transition ${
                                        url.startsWith(item.href)
                                            ? "bg-white text-gray-900 font-semibold"
                                            : "hover:bg-gray-800"
                                    }`}
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="space-y-2 border-t border-gray-800 pt-4">
                        <a
                            href="/"
                            className="flex items-center px-4 py-2 rounded-md bg-white text-gray-900 font-medium hover:bg-gray-200 transition"
                        >
                            <Eye size={18} className="mr-2" /> Preview Website
                        </a>
                        <button
                            onClick={() => router.post("/logout")}
                            className="flex items-center w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition"
                        >
                            <LogOut size={18} className="mr-2" /> Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Backdrop for mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
                    onClick={toggleMenu}
                />
            )}
        </>
    );
}
