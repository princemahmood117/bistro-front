import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [],refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

//   make any one admin function
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res => {
  

        if(res.data.modifiedCount > 0){
            refetch()
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${user.name} is an admin now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
         
    })
  }

//   delete user function
  const handleDeleteUser = (user) => {
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

            axiosSecure.delete(`/users/${user._id}`)
            .then(res => {
                
                if(res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                      });
                }
               
            })

        }
      });
  }


  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-3xl">All users</h2>
        <h2 className="text-3xl">Total users : {users.length}</h2>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
                users.map((user,index) =>   <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>
                    {
                        user.role === 'admin' ? 'Admin' : <button onClick={()=> handleMakeAdmin(user)} className="btn bg-orange-500 text-white btn-lg"> <FaUsers></FaUsers> </button>
                    }
                    </td>

                    <td>
                         <button onClick={()=> handleDeleteUser(user)} className="btn btn-ghost btn-lg text-red-500"> <FaTrashAlt></FaTrashAlt> </button>
                    </td>
                  </tr> )
            }
         
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
