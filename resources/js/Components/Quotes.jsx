import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Quotes = () => {
    return (
        <div
            className="relative w-full h-[110vh] flex items-center justify-center bg-cover bg-center px-4"
            style={{
                backgroundImage:
                    "url('https://images.saymedia-content.com/.image/t_share/MTkzOTUzODU0MDkyODEzODI5/particlesjs-examples.gif')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Centered Quote Box */}
            <div className="relative z-10 max-w-3xl w-full text-center px-6 py-10 bg-white/10  min-h-40 max-h-52 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 animate-fade-in-up">
                <h2 className="text-white text-2xl md:text-4xl font-semibold leading-relaxed drop-shadow-md">
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
