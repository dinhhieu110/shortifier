import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { CreateLink, Error, LinkCard } from "@/components";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrl";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import type { IUrl } from "@/types";

const DashBoard = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls = [],
    fn: fnFetchUrls,
  } = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    error: errorClicks,
    data: clicks = [],
    fn: fnFetchClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url: IUrl) => url.id)
  );

  useEffect(() => {
    fnFetchUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnFetchClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url: IUrl) =>
    url.title?.toLowerCase().includes(searchQuery.toLowerCase())
  ) as IUrl[];

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold text-[#555]">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {filteredUrls?.length &&
        filteredUrls?.map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnFetchUrls} />
        ))}
    </div>
  );
};

export default DashBoard;
