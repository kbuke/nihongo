import "./BusinessPicture.css"

function BusinessPicture({
    businessPicture,
    businessName
}){
    return(
        <div id="businessImgContainer">
            <img 
                id="businessImg"
                src={businessPicture}
                alt={`${businessName} Picture`}
            />
        </div>
    )
}
export default BusinessPicture