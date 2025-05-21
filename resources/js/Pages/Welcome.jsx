import { Head, Link } from "@inertiajs/react";
import logo from "../images/logo.png";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { useEffect } from "react";
import CourseCards from "@/Components/CourseCards";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";

export default function Welcome({ auth, data = [] }) {
    useEffect(() => {
        if (!sessionStorage.getItem("WelcomePageRefreshed")) {
            sessionStorage.setItem("WelcomePageRefreshed", "true");
            window.location.reload();
        }
    }, []);

    return (
        <div className="overflow-x-hidden ">
            <Head title="Home" />
            <Navbar auth={auth} />

            <main className="flex flex-col justify-between items-center h-[300vh] w-full">
                <Hero auth={auth} />
                <CourseCards auth={auth} data={data} />
            </main>
        </div>
    );
}
