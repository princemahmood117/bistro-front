import React from "react";
import Cover from "../../shared/Cover/Cover";
import dessertImg from "../../../assets/assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/assets/menu//salad-bg.jpg";
import soupImg from "../../../assets/assets/menu/soup-bg.jpg";
import menuImage from "../../../assets/assets/menu/banner3.jpg";
import { Helmet } from "react-helmet-async";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();

  const desserts = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title> Bistro | Menu </title>
      </Helmet>

      <Cover img={menuImage} title={"our menu"}></Cover>

      <div className="my-10">
        <SectionTitle
          subHeading={"--Don't Miss--"}
          heading={"TODAY's OFFER"}
        ></SectionTitle>
      </div>

      {/* items নামক প্রপস এ offered কে পাঠানো হয়েছে যে MenuCategory তে গিয়ে লুপ থ্রু করে MenuItems এর ইনফরমেশন গুলো নিয়ে এখানে লোড করবে */}

      <MenuCategory items={offered}></MenuCategory>
      
      <MenuCategory
        items={desserts}
        title={"dessert"}
        img={dessertImg}
      ></MenuCategory>

      <MenuCategory
        items={pizza}
        title={"pizza"}
        img={pizzaImg}
      ></MenuCategory>

      <MenuCategory
        items={salad}
        title={"salad"}
        img={saladImg}
      ></MenuCategory>

      <MenuCategory
        items={soup}
        title={"soup"}
        img={soupImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
