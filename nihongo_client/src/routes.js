import App from "./App";
import Home from "./app_pages/HomePgNoLogin/NoLoginHome";
import LoggedInHome from "./app_pages/HomePgLoggedIn/LoggedInHome";
import Prefectures from "./app_pages/Prefectures/Prefectures";
import UserHome from "./app_pages/UserHomePg/UserHome";
import UserPg from "./app_pages/UserPg/UserPg";
import BusinessPg from "./app_pages/BusinessPg/BusinessPg";
import AddPrefecture from "./app_pages/AddPrefecture/AddPrefecture";
import Itineraries from "./app_pages/Itineraries/Itieneraries";

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
            },
            {
                path: "/business/:id",
                element: <BusinessPg />
            },
            {
                path: "/users/:id",
                element: <UserPg />
            },
            {
                path: "/addprefecture",
                element: <AddPrefecture />
            },
            {
                path: "/itineraries",
                element: <Itineraries />
            }
        ]
    }
]
export default routes