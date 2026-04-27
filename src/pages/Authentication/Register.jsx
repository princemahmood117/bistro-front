import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";


// const regularExpressionValue =   /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/

{
  /* 

^                         Start anchor
(?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
(?=.*[!@#$&*])            Ensure string has one special case letter.
(?=.*[0-9].*[0-9])        Ensure string has two digits.
(?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
.{8}                      Ensure string is of length 8.
$   

remove start and end anchor for any error

// remove ( .*[A-Z] ) and there will be one upper_case case
// remove ( .*[a-z] ) and there will be two lower_case case

*/
}

const Register = () => {

  const {createUser,updateUserProfile} = useContext(AuthContext);

  const axiosPublic = useAxiosPublic()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();




  const onSubmit = (data) => {
    
    createUser(data.email,data.password)
    .then(res => {
      const loggedUser = res.user;
  
      updateUserProfile(data.name, data.photoURL)
      .then(()=> {

        // create user entry in the database

        const userInfo = {
          name : data.name,
          email : data.email
        }

        axiosPublic.post('/users', userInfo )
        .then(res =>  {
          if(res.data.insertedId) {
         
            
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500
        });

        reset()
        navigate('/')
          }
        })


      })
      .catch("error")
    })
  };

 
  return (
    <>

    <Helmet>
      <title>Bistro | Register</title>
    </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2">
            <h1 className="text-5xl font-bold">Register here</h1>
            <p className="py-6">Register here to be an user of this website</p>
          </div>

          <div className="card bg-base-100 md:w-1/2  max-w-sm  shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                  })}
                />

                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}

                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">Minimum length is 6</span>
                )}

                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">Maximum length is 20</span>
                )}

                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password must contain one upper case, one lower case one
                    number and a special symbol
                  </span>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>

            <p className="p-4">
              <small>
                Have an account?
                <Link className="text-blue-700" to="/login">
                  Login here
                </Link>
              </small>
            </p>

            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
