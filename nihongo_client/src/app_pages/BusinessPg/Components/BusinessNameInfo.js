import "./BusinessNameInfo.css"

function BusinessNameInfo({
    businessName={businessName},
    businessInfo={businessInfo}
}){
    return(
        <div id="businessNameInfoContainer">
            <h1 id="businessTitle">{businessName}</h1>
            <h3 id="businessIntro">{businessInfo}</h3>
        </div>
    )
}
export default BusinessNameInfo