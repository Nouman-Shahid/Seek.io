import React, { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import ParticlesComponent from "./ParticlesComponent";

const quotesData = [
    {
        text: "If you are persistent, you will get it. If you are consistent, you will keep it.",
        author: "Harvey Mackay",
        avatar: "https://pbs.twimg.com/profile_images/1049670273325182976/xv1e8XMF_400x400.jpg",
    },
    {
        text: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela",
        avatar: "https://karsh.org/wp-content/uploads/2017/06/Yousuf-Karsh-Nelson-Mandela-1990-1523x1960.jpg",
    },
    {
        text: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci",
        avatar: "https://i.natgeofe.com/n/37c3c776-b8cb-4be1-988a-cf593c776b88/01-leonardo-da-vinci-book-talk.jpg",
    },
    {
        text: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdjqKlTf_PgfplmGbcueCkIvEGD_omZcRkQ&s",
    },
    {
        text: "The expert in anything was once a beginner.",
        author: "Helen Hayes",
        avatar: "https://thenationaldcleadingladies.org/wp-content/uploads/2021/02/hayes-color.jpg",
    },
    {
        text: "Motivation gets you going, but discipline keeps you growing.",
        author: "John C. Maxwell",
        avatar: "https://chartwellspeakers.b-cdn.net/wp-content/uploads/2018/04/John-C.-Maxwell.jpg",
    },
];

const Quotes = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % quotesData.length);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const { text, author, avatar } = quotesData[current];

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-black px-4 py-12 sm:py-20">
            <div className="absolute inset-0 z-0 overflow-hidden bg-blue-950 hidden sm:block">
                <ParticlesComponent />
            </div>
            <div className="absolute inset-0 bg-black/10 z-10" />

            <div className="relative z-20 max-w-2xl w-full px-6 py-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.3)] border border-white/20 animate-fade-in-up text-white">
                <div className="flex flex-col items-center gap-6 text-center">
                    <FaQuoteLeft className="text-4xl text-white opacity-50" />
                    <p className="text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed max-w-xl">
                        “{text}”
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                        <img
                            src={avatar}
                            alt={author}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/20"
                        />
                        <span className="text-sm sm:text-base font-medium text-white/80">
                            — {author}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quotes;
