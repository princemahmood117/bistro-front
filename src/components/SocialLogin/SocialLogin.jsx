import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {

    const {googleLogin} = useContext(AuthContext)
    const navigate = useNavigate()

    const axiosPublic = useAxiosPublic();

    const handleGoogleLogIn = () => {
        googleLogin()
        .then(res=> {
        

            const userInfo = {
                email : res.user?.email,
                name : res.user?.displayName,
            }

            axiosPublic.post('/users', userInfo)
            .then(res => {
              
                navigate('/')
            })
           
        })
        
    }
  return (
    <div>
      <div className="divider px-6"></div>
      <div className="p-4">
        <button onClick={handleGoogleLogIn} className="btn">
          <FaGoogle></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
