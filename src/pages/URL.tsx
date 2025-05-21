import { Button } from "@/components/ui/button";
import { UrlState } from "@/context";
import { getClicksPerUrl } from "@/db/apiClicks";
import { deleteUrl, getShortUrl } from "@/db/apiUrl";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const URL = () => {
  const { id: shortUrlId } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getShortUrl, { id: shortUrlId, user_id: user?.id });

  const {
    loading: loadingGetClicksPerUrl,
    data: clicks,
    fn: fnGetClicksPerUrl,
  } = useFetch(getClicksPerUrl, shortUrlId);

  const { loading: loadingDeleteUrl, fn: fnDeleteUrl } = useFetch(
    deleteUrl,
    shortUrlId
  );

  useEffect(() => {
    fn();
    fnGetClicksPerUrl();
  }, []);

  if (error) navigate("/dashboard");

  let link = "";
  if (url) {
    link = url?.short_url || url?.custom_url;
  }

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement("a");

    anchor.href = imageUrl!;
    anchor.download = fileName!;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      {(loading || loadingGetClicksPerUrl) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-5xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`http://localhost:5173/{link}`}
            target="_blank"
            className="text-3xl sm:text-4xl font-bold text-blue-400 hover:underline cursor-pointer"
          >
            http://localhost:5173/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              onClick={() =>
                navigator.clipboard.writeText(
                  `http://localhost:5173/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant={"ghost"} onClick={downloadImage}>
              <Download />
            </Button>
            <Button variant={"ghost"} onClick={() => fnDeleteUrl()}>
              {loadingDeleteUrl ? <BeatLoader size={5} /> : <Trash />}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500"
          />
        </div>
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {clicks && clicks?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{clicks?.length}</p>
                </CardContent>
              </Card>
              <CardTitle>Location Data</CardTitle>
            </CardContent>
          ) : (
            <CardContent>
              {!loadingGetClicksPerUrl
                ? "No statistics yet"
                : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default URL;
