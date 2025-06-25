import { Head, Link } from "@inertiajs/react";
import logo from "../images/logo.png";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { useEffect } from "react";
import CourseCards from "@/Components/CourseCards";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Quotes from "@/Components/Quotes";
import Features from "@/Components/Features";

export default function Welcome({ auth, data = [] }) {
    useEffect(() => {
        if (!sessionStorage.getItem("WelcomePageRefreshed")) {
            sessionStorage.setItem("WelcomePageRefreshed", "true");
            window.location.reload();
        }
    }, []);

    return (
        <>
            <Head title="Home" />
            <Navbar auth={auth} />

            <div className="overflow-hidden ">
                <main className="flex flex-col justify-between items-center h-auto w-full">
                    <Hero auth={auth} />

                    <CourseCards
                        auth={auth}
                        data={data}
                        text={`Courses That Sell Themselves`}
                    />
                    <Quotes />
                    <CourseCards
                        auth={auth}
                        data={data}
                        text={`Start with free courses`}
                        flag="Free"
                    />

                    <Features />
                </main>

                <Footer />
            </div>
        </>
    );
}
