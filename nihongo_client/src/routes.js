import App from "./App";
import Home from "./app_pages/HomePgNoLogin/NoLoginHome";
import LoggedInHome from "./app_pages/HomePgLoggedIn/LoggedInHome";
import Prefectures from "./app_pages/Prefectures/Prefectures";
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
            }
        ]
    }
]
export default routes