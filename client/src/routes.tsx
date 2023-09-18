import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CookieDetailPage from "./pages/CookieDetailPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <HomePage /> },
        { path: 'cookies/:id', element: <CookieDetailPage /> }
    ],
  },
]);

export default router;
