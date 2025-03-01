import React from "react";
import hero from "../images/assets/hero.png";
import { Link } from "@inertiajs/react";

const Hero = ({ auth }) => {
    return (
        <div className="flex justify-between p-16 items-center">
            <div className="flex flex-col w-4/5 space-y-5">
                <p className="text-7xl font-bold text-gray-600">
                    ᴀʟʟ ᴛʜᴇ ꜱᴋɪʟʟꜱ ʏᴏᴜ ɴᴇᴇᴅ ɪɴ ᴏɴᴇ ᴘʟᴀᴄᴇ
                </p>
                <p className="text-3xl w-5/6">
                    From critical skills to technical topics, Seekio supports
                    your professional development.
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
                            href={`/makecourse`}
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
    );
};

export default Hero;
