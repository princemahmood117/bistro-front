// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

// এখানে শব ডাটা লোড হবে আর এখান থেকে অন্যান্য যায়গায় ক্যাটেগোরি অনুযায়ী ব্যবহার করা হবে

const useMenu = () => {

    // const [menu,setMenu] = useState([]);

    // const [loading,setLoading] = useState(true)

    // useEffect(() => {
    //     // fetch("menu.json")

    //     fetch('http://localhost:5000/menu')
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenu(data)
    //         setLoading(false)
    //     })
    // },[])
    const axiosPublic = useAxiosPublic()
    
    const {data:menu = [], isPending:loading,refetch} = useQuery({
        queryKey : ['menu'],
        queryFn : async() => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })

    return [menu,loading,refetch]
   
        
  
};

export default useMenu;