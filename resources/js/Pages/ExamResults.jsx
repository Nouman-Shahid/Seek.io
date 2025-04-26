import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

const ExamResults = ({ results = {}, total_questions }) => {
    return (
        <AuthenticatedLayout>
            <p>
                {" "}
                {results.score}/{total_questions}
            </p>
            <p> {results.course_title}</p>
            <img src={results.course_image} />
            <p> {results.course_level}</p>
        </AuthenticatedLayout>
    );
};

export default ExamResults;
