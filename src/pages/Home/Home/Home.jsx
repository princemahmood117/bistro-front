import { Helmet } from "react-helmet-async";
import ChefService from "../../../components/ChefService/ChefService";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss</title>
      </Helmet>

      <Banner></Banner>
      <div className="p-2">
        <Category></Category>
      </div>

      <ChefService></ChefService>
      <PopularMenu></PopularMenu>
      <div className="p-2">
        <Featured></Featured>
      </div>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
