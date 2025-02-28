import { Head, Link } from "@inertiajs/react";
import logo from "../images/logo.png";
import hero from "../images/assets/hero.png";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

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
        <>
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
                                            href={route("teacherdashboard")}
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
                <div className="flex justify-between p-16 items-center">
                    <div className="flex flex-col w-4/5 space-y-5">
                        <p className="text-7xl font-bold text-gray-600">
                            ᴀʟʟ ᴛʜᴇ ꜱᴋɪʟʟꜱ ʏᴏᴜ ɴᴇᴇᴅ ɪɴ ᴏɴᴇ ᴘʟᴀᴄᴇ
                        </p>
                        <p className="text-3xl w-5/6">
                            From critical skills to technical topics, Seekio
                            supports your professional development.
                        </p>

                        <div className="flex space-x-7">
                            <Link
                                href={route("login")}
                                className="px-3 py-2 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700"
                            >
                                View Courses
                            </Link>

                            {!auth.user || auth.user.role == "Student" ? (
                                <Link
                                    href={route("login")}
                                    className="px-3 py-2 bg-green-600 text-white rounded-md transition-all duration-300 hover:bg-green-700"
                                >
                                    Enroll Courses
                                </Link>
                            ) : auth.user && auth.user.role === "Teacher" ? (
                                <Link
                                    href={route("login")}
                                    className="px-3 py-2 bg-green-600 text-white rounded-md transition-all duration-300 hover:bg-green-700"
                                >
                                    Make Courses
                                </Link>
                            ) : null}
                        </div>
                    </div>

                    <img
                        src={hero}
                        alt="hero"
                        className="w-4/12 h-96 opacity-90 rounded-xl"
                    />
                </div>

                <div className="flex flex-wrap gap-4 justify-center items-center my-16">
                    {data.map((course) => (
                        <div
                            className="w-96 h-[65vh] bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col"
                            id={course.id}
                        >
                            <img
                                className="rounded-t-lg w-full h-60 object-cover"
                                src={course.course_image}
                                alt={course.course_title}
                            />
                            <div className="p-5 flex flex-col justify-between h-full">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    {course.course_title}
                                </h5>
                                <p className="mb-3 text-gray-700 flex-grow">
                                    {course.course_desc}
                                </p>
                                <div className="flex justify-between items-center">
                                    <p className="text-green-600 font-bold font-sans">
                                        PKR {course.course_amount}
                                    </p>

                                    {!auth.user ||
                                    auth.user.role == "Student" ? (
                                        <Link
                                            href={route("login")}
                                            className="px-3 py-2 bg-green-600 text-white rounded-md transition-all duration-300 hover:bg-green-700"
                                        >
                                            Enroll Courses
                                        </Link>
                                    ) : auth.user &&
                                      auth.user.role === "Teacher" ? (
                                        <Link
                                            href={`/course/id/${course.id}`}
                                            className="px-3 py-2 bg-green-600 text-white rounded-md transition-all duration-300 hover:bg-green-700"
                                        >
                                            View Courses
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
