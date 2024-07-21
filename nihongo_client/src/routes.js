import App from "./App";
import Home from "./app_pages/HomePgNoLogin/NoLoginHome";
import LoggedInHome from "./app_pages/HomePgLoggedIn/LoggedInHome";
import Prefectures from "./app_pages/Prefectures/Prefectures";
import UserHome from "./app_pages/UserHomePg/UserHome";
import UserPg from "./app_pages/UserPg/UserPg";
import { path } from "@amcharts/amcharts4/core";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                patch: "/",
                element: <LoggedInHome />,
            },
            {
                path: "/prefectures/:id",
                element: <Prefectures />
            },
            {
                path: "/userhome",
                element: <UserHome />
            },
            {
                path: "/user/:id",
                element: <UserPg />
            }
        ]
    }
]
export default routes