import Preference from "../images/assets/preference.png";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const courses = [
    {
        id: 1,
        title: "Information Technology",
        description:
            "Includes subjects such as web development, data science, cyber security, etc.",
        name: "It",
    },
    {
        id: 2,
        title: "Business",
        description:
            "Includes subjects like Finance, Marketing, Economics, etc.",
        name: "Business",
    },
    {
        id: 3,
        title: "Science",
        description: "Includes subjects like Biology, Chemistry, Physics, etc.",
        name: "Science",
    },
    {
        id: 4,
        title: "Engineering",
        description:
            "Includes subjects like Electrical Engineering, Mechanical Engineering, etc.",
        name: "Engineering",
    },
    {
        id: 5,
        title: "Humanities",
        description:
            "Includes subjects like History, Languages, Philosophy, etc.",
        name: "Humanities",
    },
];

export default function Preferences() {
    const { data, setData, post, errors } = useForm({
        course: null,
    });

    const handleCourseSelection = (e) => {
        setData("course", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/set_preferences");
    };

    return (
        <>
            <Head title="Preferences" />
            <>
                <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('https://cdn.dribbble.com/users/2156796/screenshots/19992280/media/7d2ee3a4d15d1f335419059066067694.gif')]">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col md:flex-row w-full max-w-7xl bg-transparent rounded-lg shadow-lg p-6 "
                    >
                        <div className="flex flex-col w-full md:w-7/12 space-y-6">
                            <div className="text-center text-3xl font-extrabold text-gray-900 my-6">
                                Choose Your Course Preferences
                            </div>

                            {courses.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col">
                                        <p className="text-xl font-semibold text-gray-800">
                                            {item.title}
                                        </p>
                                        <p className="text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>
                                    <input
                                        type="radio"
                                        className="w-6 h-6 border-gray-400 text-blue-600 focus:ring-blue-500"
                                        name="course"
                                        value={item.name}
                                        checked={data.course === item.name}
                                        required
                                        onChange={handleCourseSelection}
                                    />
                                </div>
                            ))}

                            {errors.course && (
                                <div className="text-red-600 text-sm mt-2 text-center">
                                    {errors.course}
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                        <div className="w-full md:w-5/12 flex justify-center items-center">
                            <img
                                src={Preference}
                                className="w-10/12 object-cover rounded-lg shadow-md opacity-90"
                                alt="loading"
                            />
                        </div>
                    </form>
                </div>
            </>
        </>
    );
}
