

import React from "react";
import useCart from "../../hooks/useCart";
import SectionTitle from "../SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();

  const axiosSecure = useAxiosSecure()

  const totalPrice = parseInt(cart.reduce((total, item) => total + item.price, 0).toFixed(0));

  const handleDelete = (id) => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

            axiosSecure.delete(`/carts/${id}`)
            .then(res => {
                
                if(res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                      });
                }
               
            })

        }
      });

  }

  return (
    <div>
      <div>
        <SectionTitle
          subHeading={"---My Cart---"}
          heading={"Wanna Add more?"}
        ></SectionTitle>
      </div>

      <div className="flex justify-evenly my-6">
        <h2 className="text-xl md:text-3xl">Total Items :{cart.length}</h2>
        <h2 className="text-xl md:text-3xl">Total Price :${totalPrice}</h2>

       {
        cart.length ?  <Link to='/dashboard/payment'><button className="btn btn-primary">Pay Now</button></Link>
        : <button disabled className="btn btn-primary">Pay Now</button>
       }
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.name}
                  <br />
                </td>
                <td>$ {item.price}</td>
                <th>
                  <button onClick={()=> handleDelete(item._id)} className="btn btn-ghost btn-lg text-red-500"> <FaTrashAlt></FaTrashAlt> </button>
                </th>
              </tr>
            ))}

          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default Cart;
