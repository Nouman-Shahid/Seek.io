import Navbar from "@/Components/Navbar";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const DailyChallenge = ({ auth, dailyquiz, isCorrect, streakCount }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    const { data, setData, post, processing } = useForm({
        answer: "",
        quiz_id: dailyquiz?.id,
    });
    useEffect(() => {
        if (isCorrect) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [isCorrect]);

    if (!dailyquiz) {
        return (
            <div className="min-h-screen bg-blue-700 flex items-center justify-center">
                <p className="text-white text-lg font-medium">
                    No daily challenge available for your preference.
                </p>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("daily-challenge.check"), {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-blue-700 text-white">
            <Head title="Daily Challenge" />
            <Navbar auth={auth} />

            {showConfetti && <Confetti />}

            <main className="flex flex-col md:flex-row h-[90vh] w-full mx-auto">
                <section className="w-full md:w-3/5 bg-white/10 backdrop-blur-xl p-8 flex flex-col items-center justify-between shadow-2xl ring-1 ring-white/30 space-y-6">
                    <h1 className="text-4xl font-extrabold text-center text-white">
                        🚀 Daily Challenge
                    </h1>

                    <div>
                        <h2 className="text-2xl font-bold">
                            {dailyquiz.question}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={data.answer}
                            onChange={(e) => setData("answer", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl text-blue-900 font-semibold bg-white border border-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Type your answer here..."
                            required
                        />

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-100 transition duration-200"
                        >
                            Submit Answer
                        </button>
                    </form>
                    {isCorrect === false && (
                        <div className="mt-4 text-red-300 font-semibold">
                            ❌ Incorrect Answer. The correct answer is:{" "}
                            <span className="text-white font-bold">
                                {dailyquiz.options}
                            </span>
                        </div>
                    )}

                    {isCorrect === true && (
                        <div className="mt-4 text-green-300 font-semibold">
                            🎉 Correct! Well done!
                        </div>
                    )}
                </section>

                {/* Right: Streak Display (40%) */}
                <section className="w-full md:w-2/5  flex items-center justify-center bg-white/90 backdrop-blur-xl  shadow-2xl ring-1 ring-white/30 p-8 text-center">
                    <div>
                        <p className="text-lg text-gray-700">
                            Your Current Streak
                        </p>
                        <h2 className="text-6xl md:text-7xl font-extrabold text-gray-700 drop-shadow-lg mt-4">
                            🔥 {streakCount || 0} Days
                        </h2>
                        <p className="text-gray-700 mt-2">Keep it going!</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DailyChallenge;
