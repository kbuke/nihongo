import App from "./App";
import Home from "./app_pages/HomePg/NoLoginHome";
import LoggedInHome from "./app_pages/HomePg/LoggedInHome";

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
                element: <LoggedInHome />
            }
        ]
    }
]
export default routes