import { Footer, Header } from "@/components/custom";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <Header />
        {/* Body */}
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
