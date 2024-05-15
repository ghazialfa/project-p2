import { Link } from "react-router-dom";
import Marquee from "../ui/marquee";

export function Home_layout() {
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
              Watch movies so easy like you eat
            </p>
            <div className="space-x-4">
              <Link className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover bg-red-200">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl">
            <Marquee pauseOnHover className="[--duration:20s]">
              {/* {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))} */}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {/* {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))} */}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </div>
        {/* <img alt="Hero" height="300" src="/placeholder.svg" width="1270" /> */}
      </div>
    </section>
  );
}
