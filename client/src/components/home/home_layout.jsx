import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchMoviePoster } from "@/features/movies/moviePosterSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function Home_layout() {
  const dispatch = useDispatch();
  const moviePoster = useSelector((state) => state.moviePoster);
  console.log("🚀 ~ Home_layout ~ moviePoster:", moviePoster.list);

  useEffect(() => {
    dispatch(fetchMoviePoster());
  }, []);

  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const autoplay = Autoplay(carouselRef.current);
      autoplay.start();
    }
  }, [moviePoster.list]);

  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32">
      <div className="container space-y-10 xl:space-y-16">
        <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
          <div>
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              MoviKing is a movie streaming platform.
            </h1>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Experience the ultimate in effortless entertainment with our movie
              streaming app. Dive into a world of boundless enjoyment where
              streaming your favorite films is as simple and satisfying as
              enjoying your favorite meal – because watching movies should be as
              easy and delightful as a bite.
            </p>
            <div className="space-x-4">
              <Link
                to={"/login"}
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover bg-red-200">
          {moviePoster.list.length > 0 && (
            <Carousel
              emblaRef={carouselRef}
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              options={{ loop: true }}
              className="relative h-full w-full overflow-hidden rounded-lg bg-background md:shadow-xl">
              <CarouselContent>
                {moviePoster.list.map((poster, index) => (
                  <CarouselItem key={index} className="w-full h-full">
                    <img
                      src={poster.backdrop_path}
                      className="object-cover w-full h-full"
                      alt={poster.title}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious>Previous</CarouselPrevious>
              <CarouselNext>Next</CarouselNext>
            </Carousel>
          )}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </div>
    </section>
  );
}
