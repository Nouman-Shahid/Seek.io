import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import Navbar from "@/Components/Navbar";
import { MdDelete } from "react-icons/md";

export default function Edit({ mustVerifyEmail, status, auth, courses = [] }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this course?")) {
            // Implement Inertia delete request here or your preferred method
            // Example:
            // Inertia.delete(route("courses.destroy", id));
            console.log("Deleting course ID:", id);
        }
    };

    return (
        <>
            <Head title="Settings" />
            <Navbar auth={auth} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
                    {/* Profile Info */}
                    <section className="bg-white shadow sm:rounded-2xl p-6 sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </section>

                    {/* Password Update */}
                    <section className="bg-white shadow sm:rounded-2xl p-6 sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </section>

                    {/* Manage Courses */}
                    <section className="bg-white shadow sm:rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Manage Courses
                        </h2>
                        <div className="space-y-4">
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                                    >
                                        <span className="text-gray-800 font-medium">
                                            {course.course_title}
                                        </span>
                                        <button
                                            onClick={() => {
                                                const confirmed =
                                                    window.confirm(
                                                        "Are you sure you want to delete this chapter? This action cannot be undone."
                                                    );
                                                if (confirmed) {
                                                    router.visit(
                                                        `/remove_course/id/${course.id}`
                                                    );
                                                }
                                            }}
                                            className="bg-red-100 text-red-500 p-2 rounded-full hover:scale-110"
                                        >
                                            <MdDelete className="size-5" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    No courses available.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Delete Account */}
                    <section className="bg-white shadow sm:rounded-2xl p-6 sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </section>
                </div>
            </div>
        </>
    );
}
