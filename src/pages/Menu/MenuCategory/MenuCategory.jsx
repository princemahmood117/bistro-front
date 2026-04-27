import React from "react";
import MenuItem from "../../shared/MenuItem/MenuItem";
import Cover from "../../shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div>
      {title && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-4 px-4 py-4 my-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      
      <div className="flex justify-center">
        {/* dynamically টাইটেল অনুযায়ী পেইজে যাচ্ছে */}
        <Link to={`/order/${title}`}> 
          <button className="btn btn-outline my-4 border-0 border-b-2 uppercase hover:text-yellow-600">
            order now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
