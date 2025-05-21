import { createBrowserRouter } from "react-router-dom";
import { Auth, DashBoard, Landing, RedirectURL, URL } from "@/pages";
import AppLayout from "@/layout/AppLayout";
import { RequiredAuth } from "@/components";

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
        element: (
          <RequiredAuth>
            <DashBoard />
          </RequiredAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequiredAuth>
            <URL />
          </RequiredAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectURL />,
      },
    ],
  },
]);

export default router;
