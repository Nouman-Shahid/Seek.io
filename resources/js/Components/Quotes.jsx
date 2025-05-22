import React from "react";

const Quotes = () => {
    return (
        <div
            className="relative w-full h-[110vh] flex flex-col justify-center items-center px-4 bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.saymedia-content.com/.image/t_share/MTkzOTUzODU0MDkyODEzODI5/particlesjs-examples.gif')",
            }}
        >
            <div className="absolute inset-0 bg-black/30"></div>

            <h2 className="relative text-white text-3xl md:text-5xl font-semibold text-center max-w-3xl leading-relaxed z-10 drop-shadow-md animate-fade-in-up">
                “Learning never exhausts the mind.” <br /> — Leonardo da Vinci
            </h2>
        </div>
    );
};

export default Quotes;
