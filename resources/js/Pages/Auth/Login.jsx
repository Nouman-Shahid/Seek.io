import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex h-screen w-full">
                {/* Left side */}
                <div className="hidden md:block md:w-3/4 h-full">
                    <img
                        // src="https://cdn.dribbble.com/users/2156796/screenshots/19992280/media/7d2ee3a4d15d1f335419059066067694.gif"
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/ba056770455143.5ba3cb5ce2161.gif"
                        alt="Login illustration"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right side  */}
                <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center bg-white ">
                    <div className="w-full max-w-md">
                        {/* Professional Title and Subtitle */}
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Please sign in to your account to continue
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </div>

                                <Link
                                    href={route("register")}
                                    className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Don't have an account?
                                </Link>
                            </div>

                            <div className="flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <PrimaryButton disabled={processing}>
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
