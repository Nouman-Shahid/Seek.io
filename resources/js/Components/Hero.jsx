// import React from "react";
// import { Link, useForm } from "@inertiajs/react";
// import { IoSearchOutline } from "react-icons/io5";

// const Hero = ({ auth }) => {
//     const { data, setData, post, processing } = useForm({
//         searchdata: "",
//     });

//     const handleChange = (e) => {
//         setData("searchdata", e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post("/search");
//     };

//     return (
//         <div className="relative w-full h-[110vh] ">
//             {/* Background image */}
//             <div className="absolute inset-0">
//                 <img
//                     // src="https://i.makeagif.com/media/10-22-2020/Pms24f.gif"
//                     src="https://mir-s3-cdn-cf.behance.net/project_modules/source/3133e858471427.59fd8b81d899f.gif"
//                     alt="hero"
//                     className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/35" />
//             </div>

//             <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 space-y-6 text-white text-center">
//                 <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
//                     ᴀʟʟ ᴛʜᴇ ꜱᴋɪʟʟꜱ ʏᴏᴜ ɴᴇᴇᴅ ɪɴ ᴏɴᴇ ᴘʟᴀᴄᴇ
//                 </p>
//                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl">
//                     From critical skills to technical topics, Seekio supports
//                     your professional development.
//                 </p>

//                 {/* Search Form */}
//                 <form
//                     onSubmit={handleSubmit}
//                     className="flex w-full max-w-2xl items-center rounded-lg overflow-hidden shadow-md bg-white"
//                 >
//                     <input
//                         type="text"
//                         name="searchdata"
//                         placeholder="Search..."
//                         value={data.searchdata}
//                         onChange={handleChange}
//                         className="w-full p-3 text-gray-800 outline-none border-none"
//                     />
//                     <button
//                         type="submit"
//                         disabled={processing}
//                         className="text-white bg-blue-700 hover:bg-blue-600 p-3"
//                     >
//                         <IoSearchOutline className="size-6" />
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Hero;

import React from "react";
import { useForm } from "@inertiajs/react";
import { IoSearchOutline } from "react-icons/io5";

const Hero = () => {
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
        <div className="w-full h-[100vh] bg-blue-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* LEFT: Text & Search */}
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-blue-700">
                        All the skills you need in one place
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">
                        From critical skills to technical topics, Seekio
                        supports your professional development.
                    </p>

                    {/* Search Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full max-w-md mx-auto md:mx-0 items-center rounded-lg overflow-hidden shadow-md  "
                    >
                        <input
                            type="text"
                            name="searchdata"
                            placeholder="Search for courses, skills..."
                            value={data.searchdata}
                            onChange={handleChange}
                            className="flex-1 p-3 text-gray-800 outline-none border-none "
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="text-white bg-blue-700 hover:bg-blue-600 p-3"
                        >
                            <IoSearchOutline className="size-7" />
                        </button>
                    </form>
                </div>

                {/* RIGHT: Image */}
                <div className="w-full h-[350px] sm:h-[400px] md:h-[500px]">
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/ef9a3260506271.5a4f65ff2e513.gif"
                        alt="Online Learning Illustration"
                        className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-200"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
