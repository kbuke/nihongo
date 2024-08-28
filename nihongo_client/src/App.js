import './App.css';

import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import VerticalNav from './app_pages/NavBars/VerticalNav';
import HorizontalNavBar from './app_pages/NavBars/HorizontalNav';


function App() {
  //Set state for apps info
  const [users, setUsers] = useState([])
  const [loggedUser, setLoggedUser] = useState(null)
  const [prefectures, setPrefectures] = useState([])
  const [verticalNavHover, setVerticalNavHover] = useState(false);
  const [allBusinesses, setAllBusinesses] = useState([])
  const [allBusinessReviews, setAllBusinessReviews] = useState([]);
  const [allPrefectureCheckIns, setAllPrefectureCheckIns] = useState([])
  const [allPrefectureWishLists, setAllPrefectureWishLists] = useState([])
  const [allProfilePics, setAllProfilePics] = useState([])
  const [businessWishlist, setBusinessWishlist] = useState([])
  const [businessCheckIn, setBusinessCheckIn] = useState([])
  const [allPictures, setAllPictures] = useState([])
  const [allPrefectureCategories, setAllPrefectureCategories] = useState([])
  const [allPrefectureCategoryReviews, setAllPrefectureCategoryReviews] = useState([])

  //Get all users
  useEffect(() => {
    fetch("/users")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r
    })
    .then(users => setUsers(users))
  }, [allPrefectureWishLists])


  //Get all prefectures
  useEffect(() => {
    fetch("/prefectures")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(prefectures => setPrefectures(prefectures))
  }, [])

  //Get all businesses
  useEffect(() => {
    fetch("/businesses")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r
    })
    .then(businesses => setAllBusinesses(businesses))
  }, [users])

  //auto-login function
  useEffect(() => {
    fetch('/check_session')
    .then((r) => {
      if(r.ok) {
        r.json()
        .then((loggedUser) => setLoggedUser(loggedUser))
      }
    })
  }, [allPrefectureWishLists])

  //fetch all business reviews
  useEffect(() => {
    fetch("/businessreviews")
        .then(r => {
            if (r.ok) {
                return r.json();
            }
            throw r;
        })
        .then(reviews => setAllBusinessReviews(reviews));
  }, []);

  //fetch all prefecture checkins
  useEffect(() => {
    fetch('/prefecturecheckin')
      .then(r => {
        if(r.ok) {
          return r.json()
        }
        throw r
      })
      .then(checkIns => setAllPrefectureCheckIns(checkIns))
  }, [])

  //fetch all prefecture wishlists
  useEffect(() => {
    fetch('/prefecturewishlist')
      .then(r => {
        if(r.ok) {
          return r.json()
        }
        throw r 
      })
      .then(wishlists => setAllPrefectureWishLists(wishlists))
  }, [])

  //fetch all profile pictures
  useEffect(() => {
    fetch('/profilepics')
      .then(r => {
        if(r.ok) {
          return r.json()
        }
        throw r
      })
      .then(profilePics => setAllProfilePics(profilePics))
  }, [])

  //fetch all business wishlists
  useEffect(() => {
    fetch('/businesswishlist')
        .then(r => {
            if(r.ok) {
                return r.json()
            }
            throw r 
        })
        .then(wishlists => setBusinessWishlist(wishlists))
        .catch(error => console.error("Error fetching wishlists", error))
    }, [])

    //fecth all business checkins
    useEffect(() => {
      fetch("/businesscheckin")
        .then(r => {
          if(r.ok) {
            return r.json()
          }
          throw r 
        })
        .then(checkIn => setBusinessCheckIn(checkIn))
    }, [])
    
    //fetch all pictures
    useEffect(() => {
      fetch('/prefecturepics')
        .then(r => {
          if(r.ok) {
            return r.json()
          }
          throw r 
        })
        .then(picture => setAllPictures(picture))
    }, [])

    //fetch all prefecture categories
    useEffect(() => {
      fetch("/prefecturecategories")
        .then(r => {
          if(r.ok) {
            return r.json()
          }
          throw r 
        })
        .then(category => setAllPrefectureCategories(category))
    }, [])

    //fetch all prefecture category reviews
    useEffect(() => {
      fetch("/prefectureratings")
        .then(r => {
          if(r.ok) {
            return r.json()
          }
          throw r 
        })
        .then(prefectureReview => setAllPrefectureCategoryReviews(prefectureReview))
    }, [])




  return(
    <div>
      <HorizontalNavBar 
        loggedInUserImg={loggedUser? loggedUser.profile_picture : null}
        loggedUser={loggedUser}
      />
      <VerticalNav 
        verticalNavHover={verticalNavHover}
        setVerticalNavHover={setVerticalNavHover}
        setLoggedUser={setLoggedUser}
        loggedUser={loggedUser}
      />
      <Outlet context={
        {
          users: users,
          setUsers: setUsers,

          loggedUser: loggedUser,
          setLoggedUser: setLoggedUser,

          prefectures: prefectures,
          setAllPrefectures: setPrefectures,

          allBusinesses: allBusinesses,
          setAllBusinesses: setAllBusinesses,

          verticalNavHover: verticalNavHover,
          setVerticalNavHover: setVerticalNavHover,

          allBusinessReviews: allBusinessReviews,
          setAllBusinessReviews: setAllBusinessReviews,

          allPrefectureCheckIns: allPrefectureCheckIns,
          setAllPrefectureCheckIns: setAllPrefectureCheckIns,

          allPrefectureWishLists: allPrefectureWishLists,
          setAllPrefectureWishLists, setAllPrefectureWishLists,

          allProfilePics: allProfilePics,
          setAllProfilePics: setAllProfilePics,

          businessWishlist,
          setBusinessWishlist,

          businessCheckIn, 
          setBusinessCheckIn,

          allPictures,
          setAllPictures,

          allPrefectureCategories,
          setAllPrefectureCategories,

          allPrefectureCategoryReviews, 
          setAllPrefectureCategoryReviews
        }
      }/>
    </div>
  )
}

export default App;
