import './App.css';
import Home from './app_pages/HomePg/NoLoginHome';
import LoggedInHome from './app_pages/HomePg/LoggedInHome';

import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"


function App() {
  //Set state for apps info
  const [users, setUsers] = useState([])
  const [loggedUser, setLoggedUser] = useState(null)

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
      <Outlet context={
        {
          users: users,
          setUsers: setUsers,

          loggedUser: loggedUser,
          setLoggedUser: setLoggedUser
        }
      }/>
    </div>
  )
}

export default App;
