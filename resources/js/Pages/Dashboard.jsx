import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { flash } = usePage().props; // Get flash messages safely

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Check if flash exists and has an error */}
            {flash?.error && (
                <div className="bg-red-500 text-white p-3 rounded-md">
                    {flash.error}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
