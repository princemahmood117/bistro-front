import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {

  const [menu] = useMenu()

  const popular = menu.filter(item => item.category === 'popular')

  // এখানে ইউজ না করে কাস্টম_হুক (useMenu) থেকে লোড করে ইউজ করা হয়েছে পরে
  // const [menu, setMenu] = useState([]);

  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const popularItems = data.filter((item) => item.category === "popular");

  //       setMenu(popularItems);
  //     });
  // }, []);
  return (
    <section className="mb-12">
      <SectionTitle
        heading={"From Our Menu"}
        subHeading={"--Check it out--"}
      ></SectionTitle>

      <div className="grid md:grid-cols-2 gap-4 p-2 mt-4">
        {
          popular.map(item => <MenuItem key={item._id} item={item}></MenuItem> )
        }
      </div>

      <div className="mt-6 justify-center flex">
        <button className="btn btn-outline uppercase"> View full menu </button>
      </div>

    </section>
  );
};

export default PopularMenu;
