import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../../utils/axios";
import Swal from "sweetalert2";

export function Login_layout({ handleSubmit, handleChange, dataInput }) {
  const navigate = useNavigate();

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const googleToken = response.credential;

    try {
      const { data } = await api.post("/login/google", { googleToken });
      localStorage.setItem("token", data.access_token);

      navigate("/h");
    } catch (error) {
      console.log("🚀 ~ handleCredentialResponse ~ error:", error);
      const errMsg = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errMsg,
      });
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "793591115286-vhlm035ql80pai5q5dhuh8v450jnc6cu.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  });
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
              <div id="buttonDiv"></div>
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
