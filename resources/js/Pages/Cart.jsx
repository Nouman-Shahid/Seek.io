import React from "react";

const Cart = ({ courses = {}, data = {} }) => {
    return (
        <div>
            {courses.course_title} added to cart by {data.name} with user id{" "}
            {data.id}
        </div>
    );
};

export default Cart;
