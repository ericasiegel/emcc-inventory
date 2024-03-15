import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CookieDetailPage from "./pages/CookieDetailPage";
import ErrorPage from "./pages/ErrorPage";
import Pantry from "./pages/Pantry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <HomePage /> },
        { path: 'pantry', element: <Pantry /> },
        { path: 'cookies/:slug', element: <CookieDetailPage /> }
    ],
  },
]);

export default router;
