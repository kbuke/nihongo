import { useOutletContext } from "react-router-dom";
import "./UserHome.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AllUsers from "./Components/AllUsers";
import CitizenAccounts from "./Components/CitizenAccounts";
import AdminAccounts from "./Components/AdminAccounts";
import TravelerUsers from "./Components/TravelerUsers";
import BusinessAccounts from "./Components/BusinessAccounts";

import homeIcon from "../../assets/homeIcon.png";
import currentIcon from "../../assets/visitedMark.png";
import roleIcon from "../../assets/userIcon.jpg";

function UserHome() {
    const appData = useOutletContext();

    const [allUsers, setAllUsers] = useState([]);
    const [filterBar, setFilterBar] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Users");
    const [selectedPrefecture, setSelectedPrefecture] = useState("All Prefectures")
    const [prefectureFilter, setPrefectureFilter] = useState(false)
    const [selectedBusiness, setSelectedBusiness] = useState("All Businesses")
    const [businessFilter, setBusinessFilter] = useState(false)


    useEffect(() => {
        setAllUsers(appData.users);
    }, [appData.users]);

    const allRoles = allUsers.map(userInfo => userInfo.role);
    const orderedRoles = [...new Set(allRoles)].sort();
    //Show all categories in button format
    const categoryButtons = ["All Users", ...orderedRoles];

    const renderButtons = categoryButtons.map((category, index) => (
        <button 
            key={index} 
            onClick={() => setSelectedCategory(category)}
            id="categoryButtons"
            className={selectedCategory == category ? "selected" : null}
        >
            {category}
        </button>
    ));

    //Get all travelers, admins, and citizens
    const userAccounts = allUsers.filter(userRoles => 
        userRoles.role === "Admin" || 
        userRoles.role === "Citizen" || 
        userRoles.role === "Traveller"
    );

    //get all admins
    const adminAccounts = allUsers.filter(userRoles => userRoles.role == "Admin")

    //get all citizens
    const citizenAccounts = allUsers.filter(userRoles => userRoles.role == "Citizen")

    //get all travelers
    const travelerRole = allUsers.filter(userRoles => userRoles.role == "Traveller")

    //get all businesses
    const businessRole = appData.allBusinesses

    //Get all business types 
    const businessTypes = ["All Businesses"]

    const availableBusinessTypes = businessRole.map(business => (
        business.business_types.flatMap(businessInfo => businessInfo.registered_type.business_type)
    ))

    const flattenBusinessTypes = availableBusinessTypes.flat().sort()
    
    const allUniqueBusinessTypes = [...new Set(flattenBusinessTypes)].sort()

    const uniqueBusinessTypes = [...businessTypes, ...allUniqueBusinessTypes]

    //get all available prefectures
    const businessPrefectures = ["All Prefectures"];

    const availablePrefectures = businessRole.map(business => business.prefecture.prefecture_name);
    const uniquePrefectures = [...new Set(availablePrefectures)].sort();

    const updatedBusinessPrefectures = [...businessPrefectures, ...uniquePrefectures];

    //Create filter buttons for prefectures and types of businesses
    const filterArrays = (array, setCategoryFilter, categoryFilter, selectedCategory, setSelectedCategory) => {
        return <div className={categoryFilter ? "chooseOption" : "noSelection"}>
            <button
                onClick={() => setCategoryFilter(!categoryFilter)}
                className = {categoryFilter ? "filterSelectButton" : "noSelectFilterButton"}
            >
                {`${selectedCategory}`}
            </button>
            {categoryFilter ? 
                <div>
                    {array.map((category, index) => (
                        <div
                            onClick={() => setCategoryFilter(false)}
                        >
                            <ul
                                id="selectedFilter"
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {`${category}`}
                            </ul>
                        </div>
                    ))}
                </div>
                :
                null
            }
        </div>
    }

    //Set page design
    const prefectureContainerStyle = appData.verticalNavHover
        ? {
              marginLeft: "220px",
              width: "calc(100% - 220px)",
          }
        : {
              marginLeft: "50px",
              width: "calc(100% - 50px)",
          };
    
    //Create the business cards
    const userCards = (userAccounts) => {
        console.log(userAccounts)
        return userAccounts.map((userInfo, index) => (
            <Link 
                key={index}
                id="userCard"
                to={`/users/${userInfo.id}`}
            >
                <div id="userImgCardContainer">
                    <img 
                        id="userCardImg"
                        src={userInfo.profile_picture}
                        alt={`${userInfo.username} Picture`}
                    />
                </div>

                <div id="userNameCardContainer">
                    <h3>{userInfo.username}</h3>
                </div>

                <div id="userInfoGrid">
                    <div id="userHomeInfoGrid">
                        <div className="userCardIconInfo">
                            <img 
                                className="userCardIcon"
                                src={homeIcon}
                            />
                        </div>
                        <h6>{userInfo.hometown}, {userInfo.home_country}</h6>
                    </div>

                    <div id="userCurrentInfoGrid">
                        <div className="userCardIconInfo">
                            <img 
                                className="userCardIcon"
                                src={currentIcon}
                            />
                        </div>
                        {userInfo.current_town ? 
                            <h6>{userInfo.current_town}, {userInfo.current_country}</h6>
                            :
                            <h6>N/A</h6>
                        }
                    </div>

                    <div id="userRoleInfoGrid">
                        <div className="userCardIconInfo">
                            <img 
                                className="userCardIcon"
                                src={roleIcon}
                            />
                        </div>
                        <h6>{userInfo.role}</h6>
                    </div>
                </div>
            </Link>
        ))
    }

    return (
        <div id="userHomePgContainer" 
            style={prefectureContainerStyle}
            onClick={() => {
                if (prefectureFilter) setPrefectureFilter(false);
                if (businessFilter) setBusinessFilter(false);
            }}
        >
            {renderButtons}
            {selectedCategory === "Local Business" ? 
                <div id="filterBusinessesGrid">
                    <h2>Filter Businesses</h2>
                    <div id="businessFilterGrid">
                        {filterArrays(uniqueBusinessTypes, setBusinessFilter, businessFilter, selectedBusiness, setSelectedBusiness)}
                        {filterArrays(updatedBusinessPrefectures, setPrefectureFilter, prefectureFilter, selectedPrefecture, setSelectedPrefecture)}
                        <input 
                            id="filterUsers"
                            placeholder="Search for Business"
                            onChange={(e) => setFilterBar(e.target.value)}
                        />
                    </div>
                    
                </div>
                :
                <input 
                    id="filterUsers"
                    placeholder="Search for Users"
                    onChange={(e) => setFilterBar(e.target.value)}
                />
            }

            <div id="userCardGrid">
                {selectedCategory === "All Users" ? (
                    <AllUsers 
                        userAccounts={userAccounts} 
                        userCards={userCards}
                        filterBar={filterBar}
                    />
                ) : selectedCategory === "Admin" ? (
                    <AdminAccounts 
                        adminAccounts={adminAccounts}
                        userCards={userCards}
                        filterBar={filterBar}
                    />
                ) : selectedCategory === "Citizen" ? (
                    <CitizenAccounts 
                        citizenAccounts={citizenAccounts}
                        userCards = {userCards}
                        filterBar={filterBar}
                    />
                ) : selectedCategory === "Traveller" ? (
                    <TravelerUsers 
                        userCards={userCards}
                        travelerRole = {travelerRole}
                        filterBar={filterBar}
                    />
                ) : selectedCategory === "Local Business" ? (
                    <BusinessAccounts 
                        businessRole={businessRole}
                        filterBar={filterBar}
                        selectedPrefecture={selectedPrefecture}
                        selectedBusiness={selectedBusiness}
                    />
                ) : null}
            </div>
        </div>
    );
}
export default UserHome;








