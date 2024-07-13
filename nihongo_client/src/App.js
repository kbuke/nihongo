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
  }, [])

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

  console.log(loggedUser)

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
          setVerticalNavHover: setVerticalNavHover
        }
      }/>
    </div>
  )
}

export default App;
