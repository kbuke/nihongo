import "./LoggedInHome.css";
import logo from "../../assets/logo.png"
import map from "../../assets/map.jpg"

import JapanMap from "./Components/JapanMap";

import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";


function LoggedInHome() {
  // Retrieve data from App.js
  const appData = useOutletContext();

  // Show logged in user info
  const loggedInUser = appData.loggedUser;

  const loggedUserRole = loggedInUser.role 

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
    <div
      id="loggedHomePg"
      style={homePgContainerStyle}
    >
      <div
        id="pgContainer"
      >
        <div
          id="homePgContentContainer"
        >
          <h1
            id="homePgHeader"
          >
            Welcome to Nihongo
          </h1>

          <h3
            id="homePgIntroInfo"
          >
            Your go-to for Japanese Travel
          </h3>

          <h4
            className="homePgInfoText"
          >
            Use Nihongo to meet Japanese locals, and other travelers.
          </h4>

          <h4
            className="homePgInfoText"
          >
            Search each of Japans 42 prefectures, to find the highest rated sites, and hidden-gems.
          </h4>

          <h4
            className="homePgInfoText"
          >
            Plan your trip, by highlighting your own personal interests.
          </h4>

          <h4
            className="homePgInfoText"
          >
            Create and read user and businesses blogs to see what is new in the country.
          </h4>

          <img 
            id="homePgLogo"
            src={logo}
          />

          {loggedUserRole === "Admin" ? 
            <Link
              id="adminHomePgAdminOption"
              style={{
                backgroundImage: `url(${map})`
              }}
              to={"/addprefecture"}
            >
              <div
                id="homePgAdminPrefectureContainer"
              >
                <h2
                  id="homePgAdminAddPrefecture"
                >
                  Add a Prefecture
                </h2>
              </div>
            </Link>
            :
            null
          }
        </div>
        
        <div id="homePgContentSecondContainer">
          <div
            id="homePgIntroOptionsGrid"
          >
            <Link
              className="homePgIntroAvailableOptions"
              id="userPgLink"
              to={'/userhome'}
              style={{
                backgroundImage: `url(https://i.pinimg.com/originals/1f/e5/13/1fe5134c9e1d9283a3a9f043a55aedbd.jpg)`
              }}
            >
              <div
                className="homePgCardTitleContainer"
              >
                <h2
                  className="homePgCardTitle"
                >
                  Users
                </h2>
              </div>
            </Link>
              
            <Link
              className="homePgIntroAvailableOptions"
              id="sitesPgLink"
              style={{
                backgroundImage: `url(https://storage.googleapis.com/pod_public/1300/183993.jpg)`
              }}
            >
              <div
                className="homePgCardTitleContainer"
              >
                <h2
                  className="homePgCardTitle"
                >
                  Sites
                </h2>
              </div>
            </Link>

            <Link
              className="homePgIntroAvailableOptions"
              id="hotelPgLink"
              style={{
                backgroundImage: `url(https://img.freepik.com/premium-photo/watercolor-room-japanese-ryokan-room-traditional-japanese-inn-white-background-scene-art_655090-590933.jpg?w=1060)`
              }}
              to="/hotelhome"
            >
              <div
                className="homePgCardTitleContainer"
              >
                <h2
                  className="homePgCardTitle"
                >
                  Hotels
                </h2>
              </div>
            </Link>
          </div>
          <div id="japanMapContainer">
            <h1
              id="japnMapTitle"
            >
              Explore Japans Prefectures
            </h1>
            <JapanMap allPrefectures={allPrefectures}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoggedInHome;