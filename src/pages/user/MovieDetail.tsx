import { useMovieStore } from "@/store/useMovieStore";
import CustomTabs from "@/ui/tabs/CustomTabs";
import { useEffect, useState } from "react";
// import { useParams } from "react-router";
import {
  ImageCarousel,
  MovieInfo,
  Review,
  Summary,
} from "@/components/user/movieDetail";
import { useMovieDetailQuery } from "@/api/query/user/movieQuery";
import { useParams } from "react-router";
import type { MovieDetailType } from "@/types/MovieTypes";

const MovieDetail = () => {
  const { id } = useParams();
  const { activeTab, setActiveTab } = useMovieStore();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const { data } = useMovieDetailQuery(id ?? "");

  const tabs = [
    {
      id: 1,
      label: "Summary",
      component: <Summary movie={movie} />,
    },
    {
      id: 2,
      label: "User Review",
      component: <Review movie={movie} />,
    },
  ];

  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [movie]);

  useEffect(() => {
    setMovie(data?.data);
    console.log("data", data);
  }, [data]);

  if (movie)
    return (
      <div>
        <MovieInfo movie={movie} />
        <div className="px-[150px]">
          <div className="mt-40">
            <div className="text-4xl font-semibold mb-10">Photos</div>
            <ImageCarousel images={movie.photos?.map((p) => p?.url)} />
          </div>
          <div>
            <CustomTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>
    );
};

export default MovieDetail;
