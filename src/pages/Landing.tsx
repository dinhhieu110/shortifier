import { HowItWork } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longUrl, setLongUrl] = useState<string>("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-[#555] text-center font-extrabold">
        Paste the URL to be shortened 👇
      </h2>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 "
      >
        <Input
          value={longUrl}
          type="url"
          placeholder="Enter the link here "
          className="h-full flex-1 py-4 px-4"
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button
          type="submit"
          className="h-full bg-[#0186da] hover:bg-[#0186da]  cursor-pointer"
        >
          Shorten
        </Button>
      </form>
      {/* <img src="/banner.jpeg" alt="banner" className="w-full my-11 md:px-11" /> */}
      <HowItWork />
    </div>
  );
};

export default Landing;
