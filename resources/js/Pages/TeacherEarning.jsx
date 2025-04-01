import React from "react";

const TeacherEarning = ({ data = {} }) => {
    return <div>{data.total_amount}</div>;
};

export default TeacherEarning;
