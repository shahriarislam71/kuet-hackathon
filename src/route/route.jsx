import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import Home from "../home/Home";

const route = createBrowserRouter([
    {
        path : '/',
        element : <App></App>
    },
    // {
    //     path : 'home',
    //     element : <Home></Home>
    // }
])

export default route