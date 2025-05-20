import { createBrowserRouter } from "react-router-dom";
import { Auth, DashBoard, Landing, RedirectURL, URL } from "@/pages";
import AppLayout from "@/layout/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: <URL />,
      },
      {
        path: "/:id",
        element: <RedirectURL />,
      },
    ],
  },
]);

export default router;
