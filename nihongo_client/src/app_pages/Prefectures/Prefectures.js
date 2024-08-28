import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Prefectures.css";

import PrefectureInfoContainer from "./NewComponents/PrefectureInfoContainer";
import PrefectureBusinessSites from "./NewComponents/PrefectureBusinessSites";
import PrefecturePictures from "./NewComponents/PrefecturePictures";

function Prefectures() {
    const appData = useOutletContext();

    // Check if the user is an admin
    const loggedUser = appData.loggedUser;

    // Check if vertical nav is open
    const verticalNavHover = appData.verticalNavHover;

    const params = useParams();

    const [specificPrefectureInfo, setSpecificPrefectureInfo] = useState(null);
    const [prefectureOptions, setPrefectureOptions] = useState("Sites")

    const renderedPrefectureOptions = ["Sites", "Photos"]

    const renderedPrefectureOptionsButtons = renderedPrefectureOptions.map((option, index) => (
        <button 
            key={index}
            className="renderMainPrefectureOptionsButtonChoice"
            id={option === prefectureOptions ? "selectedMainPrefectureOptionButton" : null}
            onClick={() => setPrefectureOptions(option)}
        >
            <h2>
                {option}
            </h2>
        </button>
    ))

    // Get all prefectures
    const allPrefectures = appData.prefectures;

    const specificPrefecture = allPrefectures.find((prefecture) => prefecture.id === parseInt(params.id));
    const specificPrefectureId = specificPrefecture ? specificPrefecture.id : null;

    useEffect(() => {
        if (specificPrefectureId) {
            fetch(`/prefectures/${specificPrefectureId}`)
                .then((r) => {
                    if (r.ok) {
                        return r.json();
                    }
                    throw r;
                })
                .then((specificPrefectureInfo) => {
                    setSpecificPrefectureInfo(specificPrefectureInfo);
                });
        }
    }, [specificPrefectureId]);



    if (!specificPrefectureInfo) return null; // Handle case when specificPrefectureInfo is not yet loaded

    // Get Prefecture Name
    const prefectureName = specificPrefectureInfo.prefecture_name;

    // Get Prefecture Flag
    const prefectureFlag = specificPrefectureInfo.prefecture_flag;

    // Get Prefecture Img
    const prefectureImg = specificPrefectureInfo.prefecture_img;

    // Get Prefecture Info
    const prefectureInfo = specificPrefectureInfo.prefecture_info;

    // Get Prefecture Population
    let prefecturePopulation = specificPrefectureInfo.population;
    console.log(prefecturePopulation)

    prefecturePopulation = prefecturePopulation >= 1000000 ?( 
        `${(prefecturePopulation/1000000).toFixed(1)} million`
        )
        :
        prefecturePopulation > 999 && prefecturePopulation <= 999999 ?(
            `${(prefecturePopulation/1000).toFixed(1)} Thousand`
        )
        :
        prefecturePopulation

    console.log(prefecturePopulation)

    // Get Prefecture Capital
    const prefectureCapital = specificPrefectureInfo.capital_city;


    const prefectureContainerStyle = verticalNavHover
        ? {
              marginLeft: "220px",
              width: "calc(100% - 220px)",
          }
        : {
              marginLeft: "50px",
              width: "calc(100% - 50px)",
          };
        

    return (
        <div id="prefecturePgContainer" style={prefectureContainerStyle}>
            <PrefectureInfoContainer 
                prefectureCapital={prefectureCapital}
                prefectureImg={prefectureImg}
                prefectureFlag={prefectureFlag}
                prefectureName={prefectureName}
                prefectureInfo={prefectureInfo}
                prefecturePopulation={prefecturePopulation}
                loggedUser={loggedUser}
                appData={appData}
                specificPrefectureId={specificPrefectureId}
            />

            <div id="renderPrefectureMainGrid">
                {renderedPrefectureOptionsButtons}
            </div>

            {prefectureOptions === "Sites" ? 
                <PrefectureBusinessSites 
                    appData={appData}
                    specificPrefecture={specificPrefecture}
                />
                :
                null
            }

            {prefectureOptions === "Photos" ?
                <PrefecturePictures 
                    appData={appData}
                    specificPrefectureId={specificPrefectureId}
                />
                :
                null
            }
        </div>
    );
}

export default Prefectures;


