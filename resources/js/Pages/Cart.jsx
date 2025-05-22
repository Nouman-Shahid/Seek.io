import CourseCards from "@/Components/CourseCards";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { TiDelete } from "react-icons/ti";
import Navbar from "@/Components/Navbar";

const Cart = ({ courses = [], allcourses = [], flash, auth }) => {
    const { props } = usePage();
    const coupon = props.coupon || {};

    const totalAmount = courses.reduce(
        (acc, item) => acc + Number(item.course_amount || 0),
        0
    );

    const discount = coupon?.discount || 0;
    let totalAfterDiscount = totalAmount - (totalAmount * discount) / 100;

    const { data, setData, post, processing, errors } = useForm({
        coupon_code: "",
        payment: totalAfterDiscount,
    });

    const handleChange = (e) => {
        setData("coupon_code", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(totalAfterDiscount);

        post("/coupon_code", { preserveScroll: true });
    };

    return (
        <>
            <Navbar auth={auth} />
            <Head title="Cart" />
            <div className="pt-20 p-4 sm:p-6 max-w-7xl mx-auto ">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                    Shopping Cart
                </h2>
                <p className="mb-4 sm:mb-6 text-gray-600">
                    {courses.length} courses in your cart
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6  ">
                    <div className="lg:col-span-2 space-y-4">
                        {courses && courses.length > 0 ? (
                            courses.map((item, idx) => (
                                <Link
                                    href={`/course/id/${item.id}`}
                                    key={idx}
                                    className="flex flex-col sm:flex-row sm:items-center p-4 gap-4 shadow-lg border border-gray-200 rounded-lg"
                                >
                                    <img
                                        src={item.course_image}
                                        alt={item.course_title}
                                        className="w-16 h-16 rounded-md mx-auto sm:mx-0"
                                    />
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-base sm:text-lg ">
                                            {item.course_title}
                                        </h4>
                                        <p className="text-sm  text-gray-500">
                                            By{" "}
                                            <Link
                                                href={`/user/${item.course_teacher}`}
                                            >
                                                <b className="underline">
                                                    {item.name}
                                                </b>
                                            </Link>
                                        </p>
                                        <div className="text-sm text-gray-500">
                                            ⭐ {item.course_rating} |
                                            Difficulty: {item.course_level}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start sm:items-end w-[20%] ">
                                        <p className="font-semibold text-red-500 ">
                                            PKR {item.course_amount}
                                        </p>
                                        <Link
                                            href={`/remove_course/id/${item.id}`}
                                            className="mt-2 text-xs sm:text-sm bg-red-600 p-2 text-white rounded-md"
                                        >
                                            Remove
                                        </Link>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-100 rounded-lg shadow-md">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDfFs6cFxfqoOOsG26k8nCOm9D9KAMNtT1nA&s"
                                    alt="No Courses"
                                    className="w-24 h-24 mb-4 rounded-full object-cover"
                                />
                                <h3 className="text-lg font-semibold text-gray-700">
                                    No Courses Available
                                </h3>
                                <div>
                                    {flash.error ? (
                                        <p className="text-gray-500 text-md">
                                            {flash.error}
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 text-md">
                                            It looks like you haven’t added any
                                            courses yet. Explore our catalog and
                                            start learning today!
                                        </p>
                                    )}
                                </div>
                                <Link
                                    href="/explore"
                                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="bg-white border rounded-xl p-4 shadow-md h-auto">
                        <h3 className="text-lg sm:text-xl font-semibold mb-3">
                            Coupon Code
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center mb-4"
                        >
                            <TextInput
                                type="text"
                                name="coupon_code"
                                placeholder="Enter code"
                                required
                                value={data.coupon_code}
                                onChange={handleChange}
                                disabled={discount}
                                className="flex-grow h-10 px-3 border border-gray-300 rounded-l-md border-r-0"
                            />

                            <button
                                className="bg-pink-600 text-white px-4 h-10 rounded-r-md"
                                disabled={processing || discount}
                            >
                                Apply
                            </button>
                        </form>

                        <div className="space-y-2 text-sm">
                            <InputError
                                className="mt-2"
                                message={errors.coupon_code}
                            />
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>PKR {totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount:</span>
                                <span className="flex space-x-2 items-center ">
                                    {discount ? (
                                        <>
                                            <p>
                                                {discount
                                                    ? `${discount}%`
                                                    : "0%"}
                                            </p>
                                            <Link href="/remove_coupon">
                                                <TiDelete className="text-red-600 size-6" />
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <p>0%</p>
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>
                                    PKR {totalAfterDiscount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <form
                            action={route("checkout")}
                            // method="POST"
                            className="flex mt-5"
                        >
                            {courses.length !== 0 && (
                                <button
                                    type="submit"
                                    className="w-full text-xs text-center sm:text-sm bg-blue-600 p-2 text-white rounded-md"
                                >
                                    Check out
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                <div className="mt-10 sm:mt-12">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">
                        You might also like
                    </h3>
                    <CourseCards data={allcourses} />
                </div>
            </div>
        </>
    );
};

export default Cart;
