import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
// import axios from 'axios';

const FoodCard = ({item}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const {user} =useAuth()   // created a hook to retrive the information of the context

  const axiosSecure = useAxiosSecure()

  const [,refetch] = useCart()

    const {name,image,recipe,price,_id} = item;


    const handleAddtoCart = ( ) => {
      


      if(user && user.email) {

        // if user & user_email found,then send cart item to the database

      

        const cartItem = {
          menuID : _id,
          email: user.email,
          name,
          image,
          price,
        }

        // // চাইলে শুধু axios দিয়ে ডাটা সেন্ড করে দিতে পারি,কিন্ত সামনে আরো কাজ সহজ করার জন্য useAxiosSecure() hook কে ইউজ করছি

        // axios.post('http://localhost:5000/carts', cartItem)
        // .then(res=>{ 
        /

        //   if(res.data.insertedId){
        //     Swal.fire({
        //       position: "center",
        //       icon: "success",
        //       title: "Your item has been added",
        //       showConfirmButton: false,
        //       timer: 1000
        //     });
        //   }

        // })


        // axiosSecure ইউজ করলে তার ভেতর থেকে baseURL চলে আসে, তাই আলাদা ভাবে লিংক দেওয়ার দরকার নাই 
        axiosSecure.post('/carts', cartItem)
        .then(res=>{ 
          

          if(res.data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title:  `${name}has been added`,
              showConfirmButton: false,
              timer: 1000
            });

            // refetch cart to update the cart items count so we do not need to refresh the page to see the cart count

            refetch()

          }

        })

      }

      // if user & user_email not found,then show this modal 

      else {
        Swal.fire({
          title: "You are not logged in",
          text: "Please login for adding to cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes,login"
        }).then((result) => {
          if (result.isConfirmed) {

            // send the user to the login page
            navigate('/login', {state : {from:location}})

            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Your file has been deleted.",
            //   icon: "success"
            // });
          }
        });
      }

    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={image}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <p className='absolute bg-slate-600 text-white right-6 px-4 mr-6 mt-4'>${price}</p>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions">
            <button onClick={handleAddtoCart} className="btn btn-outline my-4 border-0 border-b-2 uppercase hover:text-yellow-600 bg-slate-200">Add to Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;