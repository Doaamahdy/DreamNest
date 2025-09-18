import HomePage from "./pages/homePage/HomePage.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ListPage from "./pages/listPage/ListPage";
import { Layout, RequiredAuth } from "./pages/layouts/layout.jsx";
import SinglePage from "./pages/singlePage/SinglePage.jsx";
import Profile from "./pages/profile/Profile.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import Register from "./pages/register/Register.jsx";
import ProfileUpdatePage from "./pages/profileUpdatePage.jsx/ProfileUpdatePage.jsx";
import NewPostPage from "./pages/newPostPage/NewPostPage.jsx";
import { listPageLoader, profilePostsLoader, singlePageLoader } from "./lib/loaders.js";
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/list",
          loader: listPageLoader,
          element: <ListPage />,
        },
        {
          path: "/:id",
          loader: singlePageLoader,
          element: <SinglePage />,
        },
      ],
    },
    {
      path: "/",
      element: <RequiredAuth />,
      children: [
        {
          path: "/profile",
          loader:profilePostsLoader,
          element: <Profile />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
