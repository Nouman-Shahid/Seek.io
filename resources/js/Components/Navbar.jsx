import { Head, Link, usePage } from "@inertiajs/react";
import logo from "../images/logo.png";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function Navbar({ auth }) {
    const { cartCount } = usePage().props;

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
            <nav className="fixed w-full top-0 z-50 flex justify-between items-center p-4 bg-[#f8fafc] shadow-xl border-b border-[#e5e7eb]">
                <img
                    src={logo}
                    className="h-12 mix-blend-multiply"
                    alt="Logo"
                />
                <div className="flex space-x-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            href={link.href}
                            active={link.active}
                            className="text-[#111827] hover:text-[#1d4ed8] transition-colors"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                <div className="flex space-x-4">
                    {auth.user ? (
                        <div className="sm:ms-6 sm:flex sm:items-center flex">
                            <Dropdown>
                                <div className="flex items-center space-x-5">
                                    {auth.user.role === "Teacher" ? null : (
                                        <Link
                                            href={route("cart")}
                                            className="relative inline-block"
                                        >
                                            <HiOutlineShoppingCart className="size-6 text-[#6b7280]" />
                                            {cartCount > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </Link>
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
                                                    className="bg-[#1d4ed8] text-white font-bold w-10 h-10 flex items-center justify-center rounded-full"
                                                >
                                                    {auth.user.name.charAt(0)}
                                                </button>
                                            )}
                                        </span>
                                    </Dropdown.Trigger>
                                </div>

                                <Dropdown.Content className="relative right-0 mt-2 w-48 bg-white border border-[#e5e7eb] rounded-md shadow-lg z-50">
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
                                className="px-4 py-1.5 bg-[#e5e7eb] text-[#111827] rounded-md transition-all duration-300 hover:bg-[#d1d5db]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-4 py-1.5 bg-[#1d4ed8] text-white rounded-md transition-all duration-300 hover:bg-[#2563eb]"
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
