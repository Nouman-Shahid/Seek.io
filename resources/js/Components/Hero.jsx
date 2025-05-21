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
        <div className="relative w-full h-[110vh]">
            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src="https://i.makeagif.com/media/10-22-2020/Pms24f.gif"
                    alt="hero"
                    className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-16 space-y-10 text-white">
                <p className="text-7xl font-bold leading-tight">
                    ᴀʟʟ ᴛʜᴇ ꜱᴋɪʟʟꜱ ʏᴏᴜ ɴᴇᴇᴅ ɪɴ ᴏɴᴇ ᴘʟᴀᴄᴇ
                </p>
                <p className="text-3xl max-w-5xl text-center">
                    From critical skills to technical topics, Seekio supports
                    your professional development.
                </p>

                {/* Search Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex w-[60vw] max-w-xl items-center bg-white rounded-lg overflow-hidden shadow-md border border-gray-300"
                >
                    <input
                        type="text"
                        name="searchdata"
                        placeholder="Search..."
                        value={data.searchdata}
                        onChange={handleChange}
                        className="w-full p-3 text-gray-800 outline-none border-none active:ring-0"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="text-gray-600 p-3"
                    >
                        <IoSearchOutline className="size-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Hero;
