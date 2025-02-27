import React, { useState, useEffect } from "react";
import loadingpic from "../images/assets/loading.png";
import logo from "../images/logo.png";
import { Head, Link } from "@inertiajs/react";

const quotes = [
    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
    },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela",
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb",
    },
    {
        text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr.",
    },
    {
        text: "Life is 10% what happens to us and 90% how we react to it.",
        author: "Charles R. Swindoll",
    },
    {
        text: "It's not whether you get knocked down, it's whether you get up.",
        author: "Vince Lombardi",
    },
    {
        text: "Act as if what you do makes a difference. It does.",
        author: "William James",
    },
    {
        text: "Success is not the key to happiness. Happiness is the key to success.",
        author: "Albert Schweitzer",
    },
    {
        text: "Hardships often prepare ordinary people for an extraordinary destiny.",
        author: "C.S. Lewis",
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
    },
    {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky",
    },
];

const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};

const Loading = () => {
    const [quote, setQuote] = useState(getRandomQuote());

    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(getRandomQuote());
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="Loading" />

            <div class="flex flex-wrap">
                <div class="w-full sm:w-8/12 mb-10">
                    <div class="container mx-auto h-full sm:p-10">
                        <img src={logo} className="h-12" />
                        <header class="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
                            <div class="w-full">
                                <h1 class="text-4xl lg:text-6xl font-bold text-gray-600">
                                    {quote.text}
                                </h1>
                                <div class="w-20 h-2 bg-green-700 my-4"></div>
                                <p class="text-xl mb-10">{quote.author}</p>
                            </div>
                        </header>
                    </div>
                </div>
                <img
                    src={loadingpic}
                    class="w-full h-48 object-cover sm:h-screen sm:w-4/12 opacity-85"
                />
            </div>
        </>
    );
};

export default Loading;
