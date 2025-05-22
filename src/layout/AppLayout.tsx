import { Footer, Header } from "@/components";
import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const AppLayout = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen px-4 sm:px-8 lg:px-12 xl:px-16">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default AppLayout;
