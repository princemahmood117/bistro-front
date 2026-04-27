import React from 'react';

const SectionTitle = ({subHeading,heading}) => {
    return (
        <div className='text-center space-y-4 md:w-4/12 mx-auto'>

            <p className='text-yellow-500 italic md:text-xl text--sm'>{subHeading}</p>

            <h3 className='md:text-4xl text-2xl border-y-4 py-3'>{heading }</h3>
            
        </div>
    );
};

export default SectionTitle;