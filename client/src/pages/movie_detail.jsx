import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  fetchMovieDetail,
  fetchRecommendation,
} from "@/features/movies/movieSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export function Movie_detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetail);
  const recommendation = useSelector((state) => state.movies.recommendation);

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (movie) {
      dispatch(
        fetchRecommendation({
          userRequest: `carilah 4 film yang berhubungan dengan film ${movie.title} dari segi genre atau judul atau alur cerita utamakan yang satu sequel`,
        })
      );
    }
  }, [dispatch, movie]);

  return (
    <main className="flex-1 h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="aspect-video overflow-hidden rounded-lg">
              {movie && (
                <iframe
                  className="w-full h-full"
                  src={`https://vidsrc.to/embed/movie/${movie.id}`}
                  title={movie.title}
                  allowFullScreen
                />
              )}
            </div>
            <div className="mt-10">
              <h1 className="text-2xl font-bold">{movie && movie.title}</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {movie && movie.overview}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({
                    length: Math.round(movie?.vote_average / 2),
                  }).map((_, index) => (
                    <StarIcon key={index} className="h-5 w-5" />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {movie && movie.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Related Movies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {recommendation &&
                    recommendation.map((movie) => (
                      <Link
                        key={movie.id}
                        className="group"
                        to={`/movie/${movie.id}`}>
                        <img
                          alt="Movie Poster"
                          className="rounded-lg object-cover transition-all group-hover:scale-105"
                          height={300}
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          style={{
                            aspectRatio: "200/300",
                            objectFit: "cover",
                          }}
                          width={200}
                        />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                          {movie.title}
                        </h3>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
