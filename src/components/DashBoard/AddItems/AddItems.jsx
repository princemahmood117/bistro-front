

import React from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from "sweetalert2";

const image_key = import.meta.env.VITE_IMAGE_KEY;  // from module
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`

// const image_key_imge = import.meta.env.VITE_IMAGE_KEY_IMGE;  // using im.ge

// const image_api = `https://im.ge/api/1/upload?key=${image_key_imge}`   // using im.ge api

const AddItems = () => {
  const { register, handleSubmit,reset } = useForm();

  const axiosPublic = useAxiosPublic()

  const axiosSecure = useAxiosSecure()

  const onSubmit = async(data) => {


    // image upload to imgbb and the get an url

    const imageFile = {image:data.image[0]}
    const res = await axiosPublic.post(image_api, imageFile, {
      headers : {
        'content-type' : 'multipart/form-data'
      }
    });

  

    if(res.data.success) {
      // if success is true, then send the data to the server

      const menuItem = {
        name : data.name,
        recipe : data.recipe,
        image : res.data.data.display_url,
        category : data.category,
        price : parseFloat(data.price),

      }

      // now send the data using axiosSecure

      const menuResponse = await axiosSecure.post('/menu', menuItem)
   


      if(menuResponse.data.insertedId) {
        // show success popup
        reset()
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Item has been added",
          showConfirmButton: false,
          timer: 1500
        });
      }


    }

  

  };
  return (

    <div>
      <SectionTitle
        subHeading={"What's new?"}
        heading={"ADD AN ITEM"}
      ></SectionTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full "
            />
          </div>

          <div className="flex gap-6">
            {/* category */}

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category</span>
              </label>

              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* price */}

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered "
              />
            </div>
          </div>

          {/*  recipe details */}

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe")}
              className="textarea textarea-bordered h-44"
              placeholder="Recipe Details"
            ></textarea>
          </div>

          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <div className="mt-5">
            <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
              Add Item <FaUtensils></FaUtensils>{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
