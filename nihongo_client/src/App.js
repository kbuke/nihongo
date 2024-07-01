import './App.css';
import Home from './app_pages/HomePg/Home';

import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"


function App() {
  const [users, setUsers] = useState([])

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


  return(
    <div>
      <Outlet context={
        {
          users: users,
          setUsers: setUsers
        }
      }/>
    </div>
  )
}

export default App;
