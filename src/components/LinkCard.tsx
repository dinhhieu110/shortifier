import type { IUrl } from "@/types";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrl";
import { BeatLoader } from "react-spinners";

interface ILinkCardProps {
  url?: IUrl;
  fetchUrls?: () => void;
}

const LinkCard: FC<ILinkCardProps> = ({ url, fetchUrls }) => {
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

  const handleRemoveURL = () => {
    fnDeleteUrl().then(() => {
      if (fetchUrls) fetchUrls();
    });
  };

  const { loading: loadingDelete, fn: fnDeleteUrl } = useFetch(
    deleteUrl,
    url?.id
  );

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 shadow-md rounded-lg">
      <img
        src={url?.qr}
        alt="qr code"
        className="h-32 object-contain ring ring-blue-500 self-start"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer text-[#555]">
          {url?.title}
        </span>
        <span className="text-2xl font-bold hover:underline cursor-pointer text-blue-400">
          https://trimrr.in/{url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className=" hover:underline cursor-pointer ">
          {url?.original_url}
        </span>
        <span className="flex-1 flex items-end font-extralight text-sm">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          onClick={() =>
            navigator.clipboard.writeText(`https://trimrr.in/${url?.short_url}`)
          }
        >
          <Copy />
        </Button>
        <Button variant={"ghost"} onClick={downloadImage}>
          <Download />
        </Button>
        <Button variant={"ghost"} onClick={handleRemoveURL}>
          {loadingDelete ? <BeatLoader size={5} /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
