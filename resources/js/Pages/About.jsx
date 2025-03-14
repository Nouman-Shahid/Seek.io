import React from "react";
import aboutImage1 from "../images/assets/aboutImage1.png";
import aboutImage2 from "../images/assets/aboutImage2.png";
import aboutImage3 from "../images/assets/aboutImage3.png";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const About = () => {
    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto px-6 py-2 text-gray-900">
                <h2 className="text-5xl font-bold mb-12 text-center">
                    About Us
                </h2>

                {/* Section 1: WHO ARE WE */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 mb-16">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-purple-600 mb-4">
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
                            that are recognized and valued by employers
                            worldwide.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img
                            src={aboutImage1}
                            alt="Who We Are"
                            className="w-2/3 md:w-1/2 rounded-lg"
                        />
                    </div>
                </div>

                {/* Section 2: OUR MISSION & GOAL - Reversed Layout */}
                <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-8 mb-16">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-purple-600 mb-4">
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
                            className="w-2/3 md:w-1/2 rounded-lg"
                        />
                    </div>
                </div>

                {/* Section 3: SUPPORT */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-purple-600 mb-4">
                            WE ARE HERE FOR YOU, NO MATTER WHAT
                        </h3>
                        <p className="text-lg text-gray-700 mb-4">
                            At Seekio, we understand the challenges students
                            face in their learning journeys. That is why we are
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
                            className="w-2/3 md:w-1/2 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default About;
