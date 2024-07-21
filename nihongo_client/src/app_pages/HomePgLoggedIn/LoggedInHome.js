import "./LoggedInHome.css";
import peopleImg from "../../assets/peopleImg.jpg"
import businessImg from "../../assets/businessImg.jpg"
import sitesImg from "../../assets/sitesImg.jpg"

import JapanMap from "./Components/JapanMap";

import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

function LoggedInHome() {
  // Retrieve data from App.js
  const appData = useOutletContext();

  // Show logged in user info
  const loggedInUser = appData.loggedUser;
  const setLoggedUser = appData.setLoggedUser;

  const loggedInUserImg = loggedInUser.profile_picture;

  // const [verticalNavHover, setVerticalNavHover] = useState(false);
  const verticalNavHover = appData.verticalNavHover

  const homePgContainerStyle = verticalNavHover
        ? {
              marginLeft: "220px",
              width: "calc(100% - 220px)",
          }
        : {
              marginLeft: "50px",
              width: "calc(100% - 50px)",
          };

  //Get all prefectures
  const allPrefectures = appData.prefectures 

  return (
    <div>
      <div
        style={homePgContainerStyle}
        id="pgContainer"
      >
        <JapanMap allPrefectures={allPrefectures}/>

        <div id="homePgTextContainer">
            <div id="homeTextHeader">
                <h1 style={{
                    fontFamily: "cursive", 
                    color: "red", 
                    marginBottom: "2px",
                    fontWeight: "350%"
                }}>
                    Welcome to Nihon-Go
                </h1>

                <h2 style={{
                    fontFamily: "cursive", 
                    color: "red",
                    marginTop: "2px",
                }}>
                    Your go-to for Japanese Travel
                </h2>
            </div>

            <div id="">
                <h3 style={{fontFamily: "cursive"}}>
                  Use Nihon-Go to connect with other travellers, and Japanese locals to plan your ideal trip.
                  <br/>
                  <br/>
                  Find local businesses such as restaraunts and craft shops that are off the beaten track. 
                  <br/>
                  <br/>
                  Look at other users' reviews of prefectures, cities, and local business/sites to plan a trip suited to your interests.
                </h3>
            </div>

            <div id="optionsContainer">
              <div 
                className="options"
                style={{ 
                  backgroundImage: `url(${businessImg})`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>Restaraunts</h2>
              </div>

              <Link 
                className="options"
                to={`/userhome`}
                style={{
                  backgroundImage: `url(${peopleImg})`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <h2>Users</h2>
              </Link>

              <div
                className="options"
                style={{
                  backgroundImage : `url(${sitesImg})`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <h2>Sites</h2>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LoggedInHome;