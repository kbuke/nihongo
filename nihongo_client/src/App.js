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
  }, [])

  //auto-login function
  useEffect(() => {
    fetch('/check_session')
    .then((r) => {
      if(r.ok) {
        r.json()
        .then((loggedUser) => setLoggedUser(loggedUser))
      }
    })
  }, [])

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

  console.log(allBusinesses)

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
          setAllPrefectureWishLists, setAllPrefectureWishLists
        }
      }/>
    </div>
  )
}

export default App;
