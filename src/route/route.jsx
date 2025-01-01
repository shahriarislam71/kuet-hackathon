import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import Home from "../home/Home";
import Test from "../test/Test1";
// import Home from "../home/Home";

const route = createBrowserRouter([
    {
        path : '/',
        element : <App></App>
    },
    // {
    //     path : 'home',
    //     element : <Home></Home>
    // },
    {
        path : 'test',
        element : <Test></Test>
    }
])

export default route