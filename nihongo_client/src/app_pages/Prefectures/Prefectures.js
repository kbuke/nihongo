import { useOutletContext, useParams } from "react-router-dom"

import "./Prefectures.css"

function Prefectures(){
    const appData = useOutletContext()

    const params = useParams()

    //Get all prefectures
    const allPrefectures = appData.prefectures

    const specificPrefecture = allPrefectures.find(prefecture => prefecture.id === parseInt(params.id))
    console.log(specificPrefecture)
    const prefectureName = specificPrefecture.prefecture_name
    const prefectureCapital = specificPrefecture.capital_city
    const prefecturePopulation = specificPrefecture.population 
    const prefectureInfo = specificPrefecture.prefecture_info
    const prefectureFlag = specificPrefecture.prefecture_flag
    const prefectureImg = specificPrefecture.prefecture_img

    const verticalNavHover = appData.verticalNavHover



    const prefecturePgContainerStyle = verticalNavHover
    ? {
        marginLeft: "220px",
        position: "absolute",
        top: "100px",
        width: "100%"
      }
    : {
        marginLeft: "50px",
        position: "absolute",
        top: "100px",
        width: "100%"
      };

    

    return(
        <div 
            id="prefecturePgContainer"
            style={prefecturePgContainerStyle}
        >
            <div id="prefectureHeader">
                {/* Show the flag of the prefecture */}
                <div id="prefectureFlagContainer">
                    <img 
                        id="prefectureFlag"
                        src={prefectureFlag}
                        alt={`${prefectureName} Flag`}
                    />
                </div>

                {/*Show the name of the prefecture */}
                <div id="prefectureNameContainer">
                    <h1 id="prefectureName">{prefectureName}</h1>
                    <h3 id="prefectureCapital">Capital: {prefectureCapital}</h3>
                </div>

            </div>

            <div id="prefectureInfoContainer">
                <div id="prefectureInfoImgContainer">
                    <img 
                        id="prefectureImg"
                        src={prefectureImg}
                        alt={`${prefectureName} Cover Img`}
                    />
                </div>
            </div>
        </div>
    )
}
export default Prefectures