import { useEffect, useState } from "react"
import "./UserSpecificPrefecture.css"

import { Link } from "react-router-dom"

import UserPrefecturePics from "./UserPrefecturePics"
import UserPrefectureBusiness from "./UserPrefectureBusiness"

function UserSpecificPrefecture({
    selectedPrefectureId,
    selectedPrefectureImg,
    selectedPrefectureName,
    specificUserInfo,
    appData,
    loggedUser
}) {
    const [selectedOption, setSelectedOption] = useState("Pictures");
    const [filterPics, setFilterPics] = useState([]);

    const allPictures = appData.allPictures;
    const setAllPictures = appData.setAllPictures;

    console.log(allPictures)

    useEffect(() => {
        if (allPictures && specificUserInfo) {
            setFilterPics(allPictures.filter(picture => picture.user_id === specificUserInfo.id && picture.prefecture_id === selectedPrefectureId));
        }
    }, [allPictures, specificUserInfo]);

    const selectOptions = ["Pictures", "Visited Sites", "Blogs"]
    const renderOptions = selectOptions.map((option, index) => (
        <h2 
            key={index}
            onClick={() => setSelectedOption(option)}
            className="specificPrefectureOption"
            id={selectedOption === option ? "specificPrefectureChoice" : null}
        >
            {option}
        </h2>
    ))
    console.log(filterPics)

    //Show businesses in prefecture the user has been
    const prefectureBusiness = specificUserInfo.business_visit
    const filterBusinesses = prefectureBusiness.filter(business => business.business.prefecture_id === selectedPrefectureId)

    //Show all pictures the user took in the prefecture
    const userPics = specificUserInfo.business_pictures
    // const filterPics = userPics.filter(picture => picture.prefecture_id === selectedPrefectureId)
    console.log(filterPics)

    return(
        <>
            <Link
                to={`/prefectures/${selectedPrefectureId}`}
                style={{
                    backgroundImage : `url(${selectedPrefectureImg})`
                }}
                id="specificPrefectureBackground"
            >
                <h1 
                    id="specificPrefectureTitle"
                >
                    {selectedPrefectureName}
                </h1>
            </Link>
            
            <div id="specificPrefectureOptionGrid">
                {renderOptions}
            </div>
            
            {selectedOption === "Pictures" ? 
                <UserPrefecturePics 
                    filterPics={filterPics}
                    setAllPictures={setAllPictures}
                    loggedUser={loggedUser}
                />
                :
                null
            }

            {selectedOption === "Visited Sites" ?
                <UserPrefectureBusiness 
                    filterBusinesses={filterBusinesses}
                    specificUserInfo={specificUserInfo}
                    appData={appData}
                />
                :
                null
            }

        </>
    )
}
export default UserSpecificPrefecture