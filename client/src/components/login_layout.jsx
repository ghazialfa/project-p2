import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Login_layout({ handleSubmit, handleChange, dataInput }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="rounded-lg overflow-hidden">
        <img
          alt="Login Image"
          className="aspect-[2/3] object-cover"
          height={600}
          src="https://image.tmdb.org/t/p/original/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg"
          width={400}
        />
      </div>
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="emailOrUsername"
              value={dataInput.emailOrUsername}
              onChange={handleChange}
              name="emailOrUsername"
              placeholder="Enter your email or username address"
              required
              type="emailOrUsername"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={dataInput.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter your password"
              required
              type="password"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <Button className="w-full" variant="outline">
              <GithubIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Don't have an account?
            <Link to={"/register"} className="underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
