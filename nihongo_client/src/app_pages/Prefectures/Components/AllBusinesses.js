import "./AllBusinesses.css"

function AllBusinesses({
    prefectureBusinesses,
    prefectureName
}){
    console.log(prefectureBusinesses)
    const eachBusiness = prefectureBusinesses.map((business, index) => (
        <div
            key={index}
            id="prefectureBusinessCard"
        >
            <h1 className="businessName">{business.name}</h1>
            <img 
                className="prefectureBusinessesImg"
                alt="prefecture businesses image"
                src={business.profile_picture}
            />
            <ul>
                {business.business_types.map((everyBusiness, idx) => (
                    <li key={idx}>{everyBusiness.registered_type.business_type}</li>
                ))}
            </ul>
        </div>
    ))
    return(
        <div>
            <h2>{`Businesses in ${prefectureName}`}</h2>
            <div id="allPrefectureBusinesses">
                {eachBusiness}
            </div>
        </div>
    )
}

export default AllBusinesses