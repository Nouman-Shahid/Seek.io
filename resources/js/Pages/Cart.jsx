import CourseCards from "@/Components/CourseCards";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const Cart = ({ courses = [], user = {}, data = [] }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Cart" />
            <div className="pt-20 p-4 sm:p-6 max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                    Shopping Cart
                </h2>
                <p className="mb-4 sm:mb-6 text-gray-600">
                    {courses.length} courses in your cart
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {courses ? (
                            courses.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row sm:items-center p-4 gap-4 shadow-lg"
                                >
                                    <img
                                        src={item.course_image}
                                        alt={item.course_title}
                                        className="w-16 h-16 rounded-md mx-auto sm:mx-0"
                                    />
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-base sm:text-lg">
                                            {item.course_title}
                                        </h4>
                                        <div className="text-sm text-gray-500">
                                            ⭐ {item.course_rating} |
                                            Difficulty: {item.course_level}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start sm:items-end">
                                        <p className="font-semibold text-red-500">
                                            PKR {item.course_amount}
                                        </p>
                                        <Link
                                            href={`/remove_course/id/${item.id}`}
                                            variant="destructive"
                                            className="mt-2 text-xs sm:text-sm bg-red-600 p-2 text-white rounded-md"
                                        >
                                            Remove
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>No Courses in Cart</>
                        )}
                    </div>

                    <div className="bg-white border rounded-xl p-4 shadow-md h-fit">
                        <h3 className="text-lg sm:text-xl font-semibold mb-3">
                            Coupon Code
                        </h3>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
                            <input
                                placeholder="Enter coupon"
                                className="flex-grow"
                            />
                            <button>Apply</button>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>PKR 999</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount:</span>
                                <span>- PKR 999</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>PKR 999</span>
                            </div>
                        </div>

                        <button className="mt-4">Check out</button>
                    </div>
                </div>

                <div className="mt-10 sm:mt-12">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">
                        You might also like
                    </h3>
                    <CourseCards data={data} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Cart;
