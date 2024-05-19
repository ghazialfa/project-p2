import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { api } from "../../../utils/axios";
import Swal from "sweetalert2";
import { setFetchRecommendation } from "@/features/movies/movieSlice";
import { useDispatch } from "react-redux";

export function Movie_card({ like, movie }) {
  const dispatch = useDispatch();
  const handleLike = async () => {
    try {
      await api.post(
        `/favorites/${movie.id}`,
        {
          MovieId: movie.id,
          user_id: localStorage.token,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Movie added to favorites",
        text: "Horray you liked the movie!",
        timer: 1500,
      });
    } catch (error) {
      console.log("🚀 ~ handleLike ~ error:", error);
      const { message } = error.response.data;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        timer: 1500,
      });
    }
  };

  const handleDislike = async () => {
    try {
      await api.delete(`/favorites/${movie.dbId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Movie removed from favorites",
        text: "Huuhhh... you disliked the movie?",
        timer: 1500,
      });
    } catch (error) {
      console.log("🚀 ~ handleDislike ~ error:", error);
      const { message } = error.response.data;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        timer: 1500,
      });
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden relative shadow-lg">
      <div className="relative">
        <Link to={`/movie/${movie.id}`}>
          <img
            alt="Movie Poster"
            className="w-full h-full object-cover"
            height="600"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            style={{
              aspectRatio: "400/600",
              objectFit: "cover",
            }}
            width="400"
          />
        </Link>
        <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-70 text-white px-3 py-1 rounded-md">
          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 fill-yellow-400" />
            <span className="text-sm font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <button
          onClick={like ? handleDislike : handleLike}
          className="absolute top-4 right-4">
          {like ? (
            <FaHeart className="fill-red-400 w-5 h-5 hover:fill-gray-400" />
          ) : (
            <FaHeart className="hover:fill-red-400 w-5 h-5 fill-gray-400" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold line-clamp-2">{movie.title}</h3>
      </div>
    </Card>
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
