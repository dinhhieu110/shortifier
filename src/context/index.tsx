import { getCurrentUser } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import { createContext, useContext, useEffect } from "react";

// Fetch current user session who is logged in
const UrlContext = createContext({});

const UrlProvider = ({ children }) => {
  const {
    data: user,
    loading,
    fn: fetchCurrentUser,
  } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UrlContext.Provider
      value={{ user, fetchCurrentUser, loading, isAuthenticated }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
