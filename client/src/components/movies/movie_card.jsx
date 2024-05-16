import { Card } from "@/components/ui/card";

export function Movie_card({ movie }) {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img
          alt="Movie Poster"
          className="w-full h-full object-cover"
          height="600"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          style={{
            aspectRatio: "400/600",
            objectFit: "cover",
          }}
          width="400"
        />
        <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-70 text-white px-3 py-1 rounded-md">
          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 fill-yellow-400" />
            <span className="text-sm font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
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
