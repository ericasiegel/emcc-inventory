import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CookieDetailPage from "./pages/CookieDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        { index: true, element: <HomePage /> },
        { path: 'cookies/:id', element: <CookieDetailPage /> }
    ],
  },
]);

export default router;
