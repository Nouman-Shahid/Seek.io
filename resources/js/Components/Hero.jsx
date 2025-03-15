import React from "react";
import hero from "../images/assets/hero.png";
import { Link, useForm } from "@inertiajs/react";
import { IoSearchOutline } from "react-icons/io5";

const Hero = ({ auth }) => {
    const { data, setData, post, processing } = useForm({
        searchdata: "",
    });

    const handleChange = (e) => {
        setData("searchdata", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/search");
    };

    return (
        <>
            <div className="flex justify-between p-16 items-center">
                <div className="flex flex-col w-4/5 space-y-5">
                    <p className="text-7xl font-bold text-gray-600">
                        ᴀʟʟ ᴛʜᴇ ꜱᴋɪʟʟꜱ ʏᴏᴜ ɴᴇᴇᴅ ɪɴ ᴏɴᴇ ᴘʟᴀᴄᴇ
                    </p>
                    <p className="text-3xl w-5/6">
                        From critical skills to technical topics, Seekio
                        supports your professional development.
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

            <form
                onSubmit={handleSubmit}
                className="flex mb-14 w-[60vw] items-center rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 transition-shadow"
            >
                <input
                    type="text"
                    name="searchdata"
                    placeholder="Search..."
                    value={data.searchdata}
                    onChange={handleChange}
                    className="w-full p-3 text-gray-700 border-none outline-none focus:outline-none focus:ring-0 rounded-tl-lg rounded-bl-lg"
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="text-gray-600 p-3 rounded-tr-lg rounded-br-lg"
                >
                    <IoSearchOutline className="size-6" />
                </button>
            </form>
        </>
    );
};

export default Hero;
