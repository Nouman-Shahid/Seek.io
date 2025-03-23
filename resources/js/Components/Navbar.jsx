import { Head, Link } from "@inertiajs/react";
import logo from "../images/logo.png";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function Navbar({ auth }) {
    const navLinks = [
        { name: "Home", href: route("home"), active: route().current("home") },
        {
            name: "Explore",
            href: route("explore"),
            active: route().current("explore"),
        },
        {
            name: "About",
            href: route("about"),
            active: route().current("about"),
        },
        { name: "FAQ", href: route("faq"), active: route().current("faq") },
    ];

    useEffect(() => {
        if (!sessionStorage.getItem("WelcomePageRefreshed")) {
            sessionStorage.setItem("WelcomePageRefreshed", "true");
            window.location.reload();
        }
    }, []);

    return (
        <>
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
                        <div className=" sm:ms-6 sm:flex sm:items-center flex">
                            {/* Set relative here to fix dropdown positioning */}
                            <Dropdown>
                                <div className="flex items-center space-x-5">
                                    {auth.user.role === "Teacher" ? (
                                        <></>
                                    ) : (
                                        <>
                                            <Link href={route("cart")}>
                                                <HiOutlineShoppingCart className="size-6 text-gray-600" />
                                            </Link>
                                        </>
                                    )}
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            {auth.user.profile_image ? (
                                                <img
                                                    src={
                                                        auth.user.profile_image
                                                    }
                                                    className="cursor-pointer object-cover w-12 h-12 rounded-full"
                                                />
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="bg-orange-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full"
                                                >
                                                    {auth.user.name.charAt(0)}
                                                </button>
                                            )}
                                        </span>
                                    </Dropdown.Trigger>
                                </div>

                                <Dropdown.Content className="relative right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <Dropdown.Link
                                        href={route("user_dashboard")}
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
        </>
    );
}
