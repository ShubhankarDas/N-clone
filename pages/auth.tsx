import axios from "axios";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative min-h-full w-full bg-black lg:bg-opacity-50">
      <div className="h-full min-h-full w-full absolute -z-10 overflow-hidden bg-cover bg-opacity-50">
        <img
          className="min-h-full min-w-full overflow-clip"
          src="/images/hero.jpg"
          alt="hero"
        />
      </div>
      <nav className="px-12 py-5">
        <img src="/images/logo.png" alt="logo" className="h-12" />
      </nav>
      <div className="lg:min-h-screen lg:-mb-32 flex justify-center">
        <div className="bg-black bg-opacity-70 mt-8 px-16 py-16 self-start lg:mb-56 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === "login" ? "Sign in" : "Register"}
          </h2>
          <div className="flex flex-col gap-4">
            {variant === "register" && (
              <Input
                label="Name"
                id="name"
                onChange={(e: any) => setName(e.target.value)}
                value={name}
              />
            )}

            <Input
              label="Email"
              id="email"
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              label="Password"
              id="password"
              onChange={(e: any) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            onClick={variant === "login" ? login : register}
            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
          >
            {variant === "login" ? "Login" : "Sign up"}
          </button>

          <div className="flex flex-row items-center gap-4 mt-8 justify-center">
            <div
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              onClick={() => {
                signIn("google", { callbackUrl: "/profiles" });
              }}
            >
              <FcGoogle size={30} />
            </div>
            <div
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              onClick={() => {
                signIn("github", { callbackUrl: "/profiles" });
              }}
            >
              <FaGithub size={30} />
            </div>
          </div>
          <p className="text-neutral-500 mt-12">
            {variant === "login"
              ? "First time using Netflix?"
              : "Already have an account"}
            <span
              className="text-white ml-1 hover:underline cursor-pointer"
              onClick={toggleVariant}
            >
              {variant === "login" ? "Create an account" : "Log in"}
            </span>
          </p>
        </div>
        d
      </div>
      <div className="w-full py-8 px-16 bg-black bg-opacity-70 flex text-zinc-500 justify-center border-t-2 border-zinc-800 lg:border-none">
        <div className="self-center w-full lg:w-4/5 lg:max-w-5xl">
          <p>
            Questions?{" "}
            <span className="cursor-pointer hover:underline">
              Call 8008008000
            </span>
          </p>
          <ul className="my-6 grid justify-between gap-2 text-sm grid-cols-2 lg:grid-cols-4 sm:grid-cols-3">
            <li className="cursor-pointer hover:underline">Faq</li>
            <li className="cursor-pointer hover:underline">Terms of use</li>
            <li className="cursor-pointer hover:underline">Help center</li>
            <li className="cursor-pointer hover:underline">
              Cookie preferences
            </li>
            <li className="cursor-pointer hover:underline">Privacy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
