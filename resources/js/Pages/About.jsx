import React from "react";
import aboutImage1 from "../images/assets/aboutImage1.png";
import aboutImage2 from "../images/assets/aboutImage2.png";
import aboutImage3 from "../images/assets/aboutImage3.png";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const About = ({ auth }) => {
    return (
        <>
            <Head title="About" />
            <Navbar auth={auth} />

            <div className="max-w-6xl mx-auto px-6 py-20 text-gray-900">
                <h2 className="text-5xl font-bold mb-16 text-center text-blue-800">
                    About Us
                </h2>

                {/* Section 1: WHO ARE WE */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-20 group">
                    <div className="flex-1 transition-all duration-300 ease-in-out">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                            WHO ARE WE?
                        </h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Seekio is a leading platform dedicated to providing
                            high-quality courses for students aspiring to excel
                            in the IT sector.
                        </p>
                        <p className="text-lg text-gray-700">
                            We are committed to creating pathways for students
                            who not only learn but do so with certifications
                            recognized and valued by employers worldwide.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img
                            src={aboutImage1}
                            alt="Who We Are"
                            className="w-2/3 md:w-1/2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Section 2: OUR MISSION & GOAL */}
                <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-12 mb-20 group">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                            OUR MISSION & GOAL
                        </h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Our mission is to empower individuals with the
                            knowledge and skills required to launch and advance
                            their careers in the IT sector.
                        </p>
                        <p className="text-lg text-gray-700">
                            Our goal is to ensure that each learner receives a
                            certificate that holds true value, enhances their
                            employability, and gives them the confidence to
                            succeed in the tech world.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img
                            src={aboutImage2}
                            alt="Mission"
                            className="w-2/3 md:w-1/2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Section 3: SUPPORT */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 group">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                            WE ARE HERE FOR YOU, NO MATTER WHAT
                        </h3>
                        <p className="text-lg text-gray-700 mb-4">
                            At Seekio, we understand the challenges students
                            face in their learning journeys. That’s why we’re
                            here to support you every step of the way.
                        </p>
                        <p className="text-lg text-gray-700">
                            Whether you’re just starting out or looking to
                            advance your career, we are with you.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img
                            src={aboutImage3}
                            alt="Support"
                            className="w-2/3 md:w-1/2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default About;
