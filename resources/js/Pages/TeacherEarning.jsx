import React from "react";

const TeacherEarning = ({ TeacherWallet = {}, Enrollments = [] }) => {
    return <div>PKR {TeacherWallet.total_amount}</div>;
};

export default TeacherEarning;
