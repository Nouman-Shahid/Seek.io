import React from "react";
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
        <div className="relative w-full h-[110vh] top-20">
            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src="https://i.makeagif.com/media/10-22-2020/Pms24f.gif"
                    alt="hero"
                    className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 sm:px-16 space-y-10 text-white text-center">
                <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight max-w-5xl">
                    ᴀʟʟ ᴛʜᴇ ꜱᴋɪʟʟꜱ ʏᴏᴜ ɴᴇᴇᴅ ɪɴ ᴏɴᴇ ᴘʟᴀᴄᴇ
                </p>
                <p className="text-xl sm:text-2xl max-w-4xl text-gray-200">
                    From critical skills to technical topics, Seekio supports
                    your professional development.
                </p>

                {/* Search Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex w-[90vw] sm:w-[60vw] max-w-xl items-center rounded-lg overflow-hidden shadow-md "
                >
                    <input
                        type="text"
                        name="searchdata"
                        placeholder="Search..."
                        value={data.searchdata}
                        onChange={handleChange}
                        className="w-full p-3 text-[#111827] placeholder:text-[#6b7280] outline-none border-none focus:ring-0 focus:outline-none focus:border-transparent"
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="text-white bg-blue-700 hover:bg-blue-600 p-3 transition-colors"
                    >
                        <IoSearchOutline className="size-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Hero;
