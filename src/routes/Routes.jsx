import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import OrderFood from "../pages/OrderFood/OrderFood";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import SecrectPage from "../pages/SecrectPage/SecrectPage";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../components/DashBoard/DashBoard";
import Cart from "../components/DashBoard/Cart";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllUsers from "../components/DashBoard/Pages/AllUsers";
import AddItems from "../components/DashBoard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManegeItems from "../components/DashBoard/ManageItems/ManegeItems";
import UpdateItem from "../components/DashBoard/UpdateItem/UpdateItem";
import Payment from "../components/DashBoard/Payment/Payment";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement : <ErrorPage></ErrorPage> ,
      children : [
        {
            path : '/',
            element : <Home></Home>,

        },

        {
          path : 'menu',
          element : <Menu></Menu> ,
        },

        {
          path : 'order/:category',
          element : <OrderFood></OrderFood>
        },

        {
          path : 'login',
          element : <Login></Login>
        },
        
        {
          path : '/register',
          element : <Register></Register>
        },

        {
          path : 'secret',
          element : <PrivateRoute><SecrectPage></SecrectPage></PrivateRoute>
        }
      ]
    },

// user only routes
    {
      path : 'dashboard',
      element : <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      children : [
        {
          path : 'cart',
          element : <Cart></Cart> 
        },
        
        {
          path : 'payment',
          element : <Payment></Payment> 
        },


// admin only routes
        {
          path : 'users',
          element : <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },

        {
          path : 'addItems',
          element : <AdminRoute><AddItems></AddItems></AdminRoute>
        },

        {
          path : 'updateItem/:id',
          element : <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader : ({params})=> fetch(`https://bistro-back.vercel.app/menu/${params.id}`)
        },

        {
          path : 'manageItems',
          element : <AdminRoute><ManegeItems></ManegeItems></AdminRoute>
        }
      ]
    }
  ]);