import { Head, Link, router, usePage } from "@inertiajs/react";
import logo from "../images/logo.png";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar({ auth }) {
    const { cartCount } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

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
        <nav className="w-full bg-[#f8fafc] shadow-xl border-b border-[#e5e7eb]  ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center">
                        <img
                            src={logo}
                            className="h-10 mix-blend-multiply"
                            alt="Logo"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                href={link.href}
                                active={link.active}
                                className="text-blue-700 hover:text-blue-600 transition-colors"
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* User Auth Buttons */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {auth.user ? (
                            <div className="flex items-center space-x-4">
                                {auth.user.role !== "Teacher" && (
                                    <Link
                                        href={route("cart")}
                                        className="relative"
                                    >
                                        <HiOutlineShoppingCart className="size-6 text-[#6b7280]" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                )}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            {auth.user.profile_image ? (
                                                <img
                                                    src={
                                                        auth.user.profile_image
                                                    }
                                                    className="cursor-pointer object-cover w-10 h-10 rounded-full"
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
                                    className="px-4 py-1.5 bg-[#e5e7eb] text-[#111827] rounded-md hover:bg-[#d1d5db] transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="px-4 py-1.5 bg-[#1d4ed8] text-white rounded-md hover:bg-[#2563eb] transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger for Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {menuOpen ? (
                                <HiX className="w-7 h-7" />
                            ) : (
                                <HiMenu className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
                    <div className="px-4 pt-4 pb-2 space-y-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                href={link.href}
                                active={link.active}
                                className="block text-[#111827] hover:text-[#1d4ed8] py-2"
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {auth.user ? (
                            <>
                                {auth.user.role !== "Teacher" && (
                                    <Link
                                        href={route("cart")}
                                        className="flex items-center gap-2 text-[#111827] hover:text-[#1d4ed8]"
                                    >
                                        <HiOutlineShoppingCart className="size-5" />
                                        Cart ({cartCount})
                                    </Link>
                                )}
                                <Link
                                    href={route("user_dashboard")}
                                    className="block py-2"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={route("settings.edit")}
                                    className="block py-2"
                                >
                                    Settings
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block py-2 text-left w-full"
                                >
                                    Log Out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="block py-2 text-[#111827] hover:text-[#1d4ed8]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="block py-2 text-[#1d4ed8] hover:underline"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
