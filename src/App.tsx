import { RouterProvider } from "react-router-dom";
import router from "./routers/Router";
import UrlProvider from "./context";

const App = () => {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
};

export default App;
