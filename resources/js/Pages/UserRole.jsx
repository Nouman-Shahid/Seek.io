import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import Role from "../images/assets/role.png";

const roles = [
    {
        id: 1,
        role: "Student",
        description:
            "Enroll in courses and gain access to high-quality education designed to enhance your skills and knowledge",
    },
    {
        id: 2,
        role: "Teacher",
        description:
            "Join us as a teacher and become a valuable source of knowledge, inspiring and shaping the future of your students",
    },
];

export default function UserRole() {
    const { data, setData, post, errors, reset } = useForm({
        role: null,
    });

    useEffect(() => {
        if (!sessionStorage.getItem("userRolePageRefreshed")) {
            sessionStorage.setItem("userRolePageRefreshed", "true");
            window.location.reload();
        }
    }, []);

    const handleCourseSelection = (e) => {
        setData("role", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/set_user_role");
    };

    return (
        <>
            <Head title="User Role" />
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('https://cdn.dribbble.com/users/2156796/screenshots/19992280/media/7d2ee3a4d15d1f335419059066067694.gif')]">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row w-full max-w-4xl bg-white bg-opacity-70 rounded-lg shadow-lg p-6"
                >
                    <div className="flex flex-col w-full md:w-7/12 space-y-6">
                        <div className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                            Select Your Role
                        </div>

                        {roles.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col">
                                    <p className="text-xl font-semibold text-gray-800">
                                        {item.role}
                                    </p>
                                    <p className="text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                                <input
                                    type="radio"
                                    className="w-6 h-6 border-gray-400 text-blue-600 focus:ring-blue-500"
                                    name="role"
                                    value={item.role}
                                    checked={data.role === item.role}
                                    required
                                    onChange={handleCourseSelection}
                                />
                            </div>
                        ))}

                        {errors.role && (
                            <div className="text-red-600 text-sm mt-2 text-center">
                                {errors.role}
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
                            src={Role}
                            className="w-10/12 object-cover rounded-lg shadow-md opacity-90"
                            alt="Role image depicting the different roles of Student and Teacher"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
