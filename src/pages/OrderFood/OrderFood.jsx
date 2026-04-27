import React, { useState } from "react";
import orderCover from "../../assets/assets/shop/order.jpg";
import Cover from "../shared/Cover/Cover";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../hooks/useMenu";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const OrderFood = () => {

  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']

  const {category} = useParams() // মেইন রাউটিং এ যেই প্যারামস (order/:category) ইউজ হয়েছে সেটি এখানে ডিস্ট্রাকচার করে নেওয়া হলো

  const initialIndex = categories.indexOf(category)

  const [tabIndex, setTabIndex] = useState(initialIndex);

  const [menu] = useMenu();


  const desserts = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
       <Helmet>
        <title> Bistro | Order food </title>
      </Helmet>
      <Cover img={orderCover} title={"Order Now"}></Cover>

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <div className="my-3 flex flex-row justify-center">
          <TabList>
            <Tab>SALAD</Tab>
            <Tab>PIZZA</Tab>
            <Tab>SOUP</Tab>
            <Tab>DESSERT</Tab>
            <Tab>DRINKS</Tab>
          </TabList>
        </div>

        {/* চাইলে এখানেও ম্যাপ করে দেখানো যায়, অথবা আলাদা কম্পোনেন্ট (OrderTab) বানিয়ে সেটায় রেখে তা এখানে রেন্ডার করে দেখানো যায় */}
        <TabPanel>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                salad.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
            }
              </div> */}

          <OrderTab item={salad}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab item={pizza}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab item={soup}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab item={desserts}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab item={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OrderFood;
