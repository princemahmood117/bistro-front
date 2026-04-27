import React, { useContext, useEffect, useState } from "react";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {

  const {signIn} = useContext(AuthContext)
    
  // const captchaRef = useRef(null);

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/' ;

  const [disabled,setDisabled] = useState(true)

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);


  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;


    if(validateCaptcha(user_captcha_value)) {
        setDisabled(false)
    }

    else {
        setDisabled(true)
    }
  };



  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    

    signIn(email,password)
    .then(res => {
      const userInfo = res.user;
  

      Swal.fire({
        title: "Login successful",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });

      navigate(from, {replace : true})
    })
    .catch(error => {
    })
  };
  return (

    <>
        <Helmet>
          <title>Bistro | Login</title>
        </Helmet>

    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>

        <div className="card bg-base-100 md:w-1/2  max-w-sm  shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                
              />
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
               
              />
            </div>

            {/* this is Captcha part */}

            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>

              <input
                // ref={captchaRef}
                onBlur={handleValidateCaptcha}
                name="captcha"
                type="text"
                placeholder="type the text"
                className="input input-bordered"
                
              />
              {/* <button
                // onClick={handleValidateCaptcha}
                className="btn btn-outline btn-xs mt-4"
              >
                Verify
              </button> */}
            </div>

            <div className="form-control mt-6">
              <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>

          <p className="p-4 "><small>New here? <Link className="text-blue-700" to='/register'>Create an account</Link> </small></p>

          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default Login;
