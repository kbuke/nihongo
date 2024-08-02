import "./BusinessInfoContainer.css"

import emailIcon from "../../../assets/email_icon.png"
import clockIcon from "../../../assets/clock_icon.png"
import locationIcon from "../../../assets/unvisitedMark.png"
import phoneIcon from "../../../assets/phone_icon.png"

function BusinessInfoContainer({
    businessNumber,
    businessEmail,
    businessAddress,
    businessOperatingHours
}){
    const renderInfo = (image, info) => {
        return(
            <div id="renderedInfoGrid">
                <div className="renderedInfoIconContainer">
                    <img 
                        className="renderedIcon"
                        src={image}
                    />
                </div>
                <h3>{info}</h3>
            </div>
        )
    }
    return (
        <div id="businessInfoRenderGrid">
            {renderInfo(emailIcon, businessEmail)}
            {renderInfo(phoneIcon, businessNumber)}
            {renderInfo(clockIcon, businessOperatingHours)}
            {renderInfo(locationIcon, businessAddress)}
        </div>
    )
}
export default BusinessInfoContainer