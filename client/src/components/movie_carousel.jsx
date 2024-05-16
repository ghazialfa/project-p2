/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/E1DqaOJU4nf
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Chivo } from 'next/font/google'

chivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"

export function Movie_carousel() {
  return (<>
    <Carousel
      className="w-full h-[80vh]"
      opts={{
        autoplay: true,
        autoplaySpeed: 5000,
        loop: true,
      }}>
      <CarouselContent>
        <CarouselItem>
          <section className="w-full h-[80vh] bg-gray-900 flex items-center justify-center">
            <div
              className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md space-y-4">
                <h1 className="text-4xl font-bold text-white">Discover Your Next Favorite Movie</h1>
                <p className="text-gray-400">
                  Explore our vast collection of movies and find your perfect cinematic experience. With our intuitive
                  interface and personalized recommendations, your movie-watching journey has never been easier.
                </p>
                <div className="flex gap-4">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                    href="#">
                    Browse Movies
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-primary"
                    href="#">
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                alt="Movie Poster"
                className="max-w-[400px] w-full rounded-lg shadow-lg"
                height={800}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/800",
                  objectFit: "cover",
                }}
                width={600} />
            </div>
          </section>
        </CarouselItem>
        <CarouselItem>
          <section className="w-full h-[80vh] bg-gray-900 flex items-center justify-center">
            <div
              className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md space-y-4">
                <h1 className="text-4xl font-bold text-white">Discover Your Next Favorite Movie</h1>
                <p className="text-gray-400">
                  Explore our vast collection of movies and find your perfect cinematic experience. With our intuitive
                  interface and personalized recommendations, your movie-watching journey has never been easier.
                </p>
                <div className="flex gap-4">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                    href="#">
                    Browse Movies
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-primary"
                    href="#">
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                alt="Movie Poster"
                className="max-w-[400px] w-full rounded-lg shadow-lg"
                height={800}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/800",
                  objectFit: "cover",
                }}
                width={600} />
            </div>
          </section>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:gap-8 lg:gap-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Trending Movies</h2>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
              href="#">
              View All
            </Link>
          </div>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6" />
        </div>
      </div>
    </section>
  </>);
}