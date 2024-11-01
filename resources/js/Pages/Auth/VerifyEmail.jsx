import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <>
            <Head title="Verify Email" />

            <div className="flex h-screen w-full">
                {/* Left side */}
                <div className="hidden md:block md:w-3/4 h-full">
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/ba056770455143.5ba3cb5ce2161.gif"
                        alt="Email verification illustration"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right side */}
                <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center bg-white">
                    <div className="w-full max-w-md">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                                Verify Your Email
                            </h1>
                            <p className="text-gray-600 text-lg">
                                A verification link has been sent to your email.
                                Please check your inbox.
                            </p>
                        </div>

                        {status === "verification-link-sent" && (
                            <div className="mb-4 text-sm font-medium text-green-600 text-center">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <PrimaryButton
                                className="w-full justify-center"
                                disabled={processing}
                            >
                                Resend Verification Email
                            </PrimaryButton>

                            <div className="text-center">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="mt-4 text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
