import { Head, Link } from "@inertiajs/react";
import logo from "../images/logo.png";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { useEffect } from "react";
import CourseCards from "@/Components/CourseCards";
import Hero from "@/Components/Hero";

export default function Welcome({ auth, data = [] }) {
    const navLinks = [
        { name: "Home", href: route("home"), active: route().current("home") },
        {
            name: "Explore",
            href: route("login"),
            active: route().current("explore"),
        },
        {
            name: "About",
            href: route("login"),
            active: route().current("about"),
        },
        { name: "FAQ", href: route("login"), active: route().current("faq") },
    ];

    useEffect(() => {
        if (!sessionStorage.getItem("WelcomePageRefreshed")) {
            sessionStorage.setItem("WelcomePageRefreshed", "true");
            window.location.reload();
        }
    }, []);

    return (
        <div className="overflow-x-hidden ">
            <Head title="Home" />
            <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b">
                <img src={logo} className="h-12" alt="Logo" />
                <div className="flex space-x-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            href={link.href}
                            active={link.active}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                <div className="flex space-x-4">
                    {auth.user ? (
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="bg-orange-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full"
                                            >
                                                {auth.user.name.charAt(0)}
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={
                                                auth.user.role === "Teacher"
                                                    ? route("teacherdashboard")
                                                    : route("home")
                                            }
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("settings.edit")}
                                        >
                                            Settings
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md transition-all duration-300 hover:bg-gray-300"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-3 py-1 bg-red-600 text-white rounded-md transition-all duration-300 hover:bg-red-700"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            <main className="flex flex-col justify-between items-center h-auto w-full">
                <Hero auth={auth} />
                <CourseCards auth={auth} data={data} />
            </main>
        </div>
    );
}
