import Dropdown from "@/Components/Dropdown";
import logo from "../images/logo.png";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Footer from "@/Components/Footer";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function AuthenticatedLayout({ header, children }) {
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

    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <nav className="flex justify-between items-center p-5 bg-white shadow-md border-b">
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

                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                    <div className="relative ms-3">
                        <Dropdown>
                            <div className="flex items-center space-x-5">
                                {user.role === "Teacher" ? (
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
                                        {user.profile_image ? (
                                            <img
                                                src={user.profile_image}
                                                className="cursor-pointer object-cover w-12 h-12 rounded-full"
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                className="bg-orange-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full"
                                            >
                                                {user.name.charAt(0)}
                                            </button>
                                        )}
                                    </span>
                                </Dropdown.Trigger>
                            </div>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("user_dashboard")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link href={route("settings.edit")}>
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

                <div className="-me-2 flex items-center sm:hidden">
                    <button
                        onClick={() =>
                            setShowingNavigationDropdown(
                                (previousState) => !previousState
                            )
                        }
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className={
                                    !showingNavigationDropdown
                                        ? "inline-flex"
                                        : "hidden"
                                }
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                className={
                                    showingNavigationDropdown
                                        ? "inline-flex"
                                        : "hidden"
                                }
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("settings.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            <Footer />
        </>
    );
}
