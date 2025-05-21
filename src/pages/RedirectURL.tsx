import { storeClicks } from "@/db/apiClicks";
import { getOriginalUrl } from "@/db/apiUrl";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectURL = () => {
  const shortUrlId = useParams();

  const {
    loading,
    data,
    fn: fnFetchOriginalUrl,
  } = useFetch(getOriginalUrl, shortUrlId);

  const { loading: loadingStoreClicks, fn: fnStoreClicks } = useFetch(
    storeClicks,
    {
      id: data?.id,
      originalUrl: data?.original_url,
    }
  );

  useEffect(() => {
    fnFetchOriginalUrl();
  }, []);

  useEffect(() => {
    if (!loading && data) fnStoreClicks();
  }, [loading]);

  if (loading || loadingStoreClicks) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return <div>RedirectURL</div>;
};

export default RedirectURL;
