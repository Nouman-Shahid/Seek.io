import React from "react";
import { Typewriter } from "react-simple-typewriter";
import ParticlesComponent from "./ParticlesComponent";

const Quotes = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-black px-4 py-12 sm:py-20">
            <div className="absolute inset-0 z-0 overflow-hidden bg-blue-900 hidden sm:flex">
                <ParticlesComponent />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10   z-10" />

            <div className="relative z-20 w-full max-w-4xl text-center px-6 py-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.3)] border border-white/20 animate-fade-in-up">
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed drop-shadow-md">
                    <Typewriter
                        words={[
                            "“Learning never exhausts the mind.” — Leonardo da Vinci",
                            "“Success is the sum of small efforts, repeated day in and day out.” — Robert Collier",
                            "“The expert in anything was once a beginner.” — Helen Hayes",
                            "“Motivation gets you going, but discipline keeps you growing.” — John C. Maxwell",
                            "“It does not matter how slowly you go as long as you do not stop.” — Confucius",
                            "“Consistency is what transforms average into excellence.” — Tony Robbins",
                            "“Dedication sees dreams come true.” — Kobe Bryant",
                            "“Don’t watch the clock; do what it does. Keep going.” — Sam Levenson",
                            "“Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela",
                            "“Discipline is choosing between what you want now and what you want most.” — Abraham Lincoln",
                            "“If you are persistent, you will get it. If you are consistent, you will keep it.” — Harvey Mackay",
                            "“The beautiful thing about learning is that no one can take it away from you.” — B.B. King",
                            "“Success usually comes to those who are too busy to be looking for it.” — Henry David Thoreau",
                        ]}
                        loop={false}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={5000}
                    />
                </h2>
            </div>
        </div>
    );
};

export default Quotes;
