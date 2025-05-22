import React from "react";
import {
    ShieldCheck,
    BadgeCheck,
    MonitorCheck,
    GraduationCap,
} from "lucide-react";

const Features = () => {
    return (
        <div
            className="w-full h-[110vh] flex items-center justify-center bg-cover bg-center px-4"
            style={{
                backgroundImage:
                    "url('https://cdn.dribbble.com/userupload/41807492/file/original-47b3352ae8708bb4a96a53d5a75234ea.gif')",
            }}
        >
            <div className="bg-transparent bg-opacity-90 p-8 rounded-2xl shadow-xl max-w-5xl w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
                    Why Choose Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                    <div className="flex space-x-4 p-4 border border-blue-200 rounded-xl hover:bg-blue-700 cursor-pointer transition duration-300">
                        <div>
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                Cheating Detection
                            </h3>
                            <p className="text-sm">
                                Real-time AI monitoring ensures secure and fair
                                assessments.
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4 p-4 border border-blue-200 rounded-xl hover:bg-blue-700 cursor-pointer transition duration-300">
                        <div>
                            <BadgeCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                Worth-it Certificates
                            </h3>
                            <p className="text-sm">
                                Earn respected certificates that boost your
                                resume and credibility.
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4 p-4 border border-blue-200 rounded-xl hover:bg-blue-700 cursor-pointer transition duration-300">
                        <div>
                            <MonitorCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                User-Friendly Interface
                            </h3>
                            <p className="text-sm">
                                Modern and intuitive design, optimized for all
                                devices.
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4 p-4 border border-blue-200 rounded-xl hover:bg-blue-700 cursor-pointer transition duration-300">
                        <div>
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                Learn from Top Experts
                            </h3>
                            <p className="text-sm">
                                Gain knowledge from world-class educators and
                                industry leaders.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
