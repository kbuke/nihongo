import React from 'react';

import "./SpecificBusinesses.css"

function SpecificBusinesses({
    prefectureBusinesses,
    selectedButton
}) {

    const filteredBusinesses = prefectureBusinesses.filter(business => 
        business.business_types.some(businessType =>
            businessType.registered_type.business_type === selectedButton
        )
    );
    console.log(filteredBusinesses)

    const renderBusinessCards = filteredBusinesses.map((business, index) => (
        <div 
            key={index}
            className='prefectureBusinessCard'
        >
            <img 
                className='prefectureBusinessesImg'
                alt="prefecture businesses image"
                src={business.profile_picture}
            />
            <h3 className='businessName'>{business.name}</h3>
        </div>
    ))

    return(
        <div id="prefectureBusinessesContainer">
            <div className='prefectureBusinesses'>
                {renderBusinessCards}
            </div>
        </div>
    )
    
    // Create a mapping from business types to businesses
    // let businessTypeMapping = {};

    // prefectureBusinesses.forEach(businessInfo => {
    //     businessInfo.business_types.forEach(businessSpecifics => {
    //         const businessType = businessSpecifics.registered_type.business_type;
    //         if (!businessTypeMapping[businessType]) {
    //             businessTypeMapping[businessType] = [];
    //         }
    //         businessTypeMapping[businessType].push(businessInfo);
    //     });
    // });


    // const filterBusinesses = Object.keys(businessTypeMapping).map((businessType, index) => (
    //     <div key={index}>
    //         <h2 id="businessType">{businessType}s in {prefectureName}</h2>
    //         <div id='prefectureBusinessesContainer'>
    //             <div className='prefectureBusinesses'>
    //                 {businessTypeMapping[businessType].map((business, index) => (
    //                     <div key={index} className="prefectureBusinessCard">
    //                         <img 
    //                             className="prefectureBusinessesImg"
    //                             alt="prefecture businesses image"
    //                             src={business.profile_picture}
    //                         />
    //                         <h3 className="businessName">{business.name}</h3>
    //                         <ul>
    //                             {business.business_types.map((everyBusiness, idx) => (
    //                                 <li key={idx}>{everyBusiness.registered_type.business_type}</li>
    //                             ))}
    //                         </ul>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // ));

    // return (
    //     <div>
    //         {filterBusinesses}
    //     </div>
    // );
}

export default SpecificBusinesses;