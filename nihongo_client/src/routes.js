import App from "./App";
import Home from "./app_pages/HomePg/HomePg/Home";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
]
export default routes