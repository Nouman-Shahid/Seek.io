import React from "react";

const CourseDescription = ({ data = [] }) => {
    return (
        <>
            <div className="flex flex-wrap gap-4 justify-center items-center my-16">
                {
                    <div
                        className="w-96 h-[65vh] bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col"
                        id={data.id}
                    >
                        <img
                            className="rounded-t-lg w-full h-60 object-cover"
                            src={data.course_image}
                            alt={data.course_title}
                        />
                        <div className="p-5 flex flex-col justify-between h-full">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                {data.course_title}
                            </h5>
                            <p className="mb-3 text-gray-700 flex-grow">
                                {data.course_desc}
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-green-600 font-bold font-sans">
                                    PKR {data.course_amount}
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default CourseDescription;
