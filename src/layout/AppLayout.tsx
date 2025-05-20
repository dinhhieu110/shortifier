import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main>
        {/* Header */}
        {/* Body */}
        <Outlet />
        {/* Footer */}
      </main>
    </div>
  );
};

export default AppLayout;
