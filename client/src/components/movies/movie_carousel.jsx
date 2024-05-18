import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

export function Movie_carousel({ movies }) {
  const dispatch = useDispatch();

  const carousefRef = useRef(null);

  useEffect(() => {
    if (carousefRef.current) {
      const autoplay = Autoplay(carousefRef.current);
      autoplay.start();
    }
  }, []);

  return (
    <>
      <Carousel
        className="relative w-full h-[80vh]"
        emblaRef={carousefRef}
        options={{
          containScroll: "trimSnaps",
          loop: true,
        }}
        plugins={[
          Autoplay({
            speed: 5000,
          }),
        ]}>
        <CarouselContent>
          {movies &&
            movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="relative w-full h-full">
                  {/* Backdrop Image */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt="Backdrop"
                    className="absolute inset-0 w-full h-full object-cover z-[-1] opacity-50"
                  />
                  {/* Movie Content */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
                  <section className="relative w-full h-[80vh] flex items-center justify-center">
                    <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="max-w-md space-y-4">
                        <h1 className="text-4xl font-bold text-white">
                          {movie.title}
                        </h1>
                        <p className="text-gray-300">{movie.overview}</p>
                        <div className="flex gap-4">
                          <Link
                            to={`/movie/${movie.id}`}
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50">
                            Watch Now
                          </Link>
                        </div>
                      </div>
                      <img
                        alt="Movie Poster"
                        className="max-w-[400px] w-full rounded-lg shadow-lg"
                        height={800}
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        style={{
                          aspectRatio: "600/800",
                          objectFit: "cover",
                        }}
                        width={600}
                      />
                    </div>
                  </section>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
