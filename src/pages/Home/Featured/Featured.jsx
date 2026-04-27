import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImage from '../../../assets/assets/home/featured.jpg'
import './featured.css' ;

const Featured = () => {
    return (
        <div className='featuredItem text-white bg-fixed 6 bg-opacity-40 bg-slate-500'>

            <SectionTitle heading={'FROM OUR MENU'} subHeading={'---Check it out---'}></SectionTitle>

            

            <div className='md:flex justify-center items-center py-20 px-14' >
                <div>
                    <img src={featuredImage} alt="" />
                </div>

                <div className='md:ml-10'>
                    <p>Nov 07, 2024</p>
                    <p className='uppercase'>where can i get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga minima rem totam molestiae quis voluptatem magni quaerat? Delectus, voluptates tempora asperiores illo dolorum, quaerat eos, dolorem at velit officiis sit incidunt numquam!</p>

                    <button className='btn btn-outline mt-6 border-0 border-b-2 text-white uppercase'>Read More</button>
                </div>
            </div>
            
        </div>
    );
};

export default Featured;