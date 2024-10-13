import React, { useState } from "react";
import { useLoginMutation } from "../store/features/auth/authApi";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import LogoImage from "../assets/image.png";
import BackgroundImage from "../assets/backgroundImage.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({ username, password }).unwrap();
      dispatch(setUser(user.username));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative h-screen flex">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-right md:bg-center md:block hidden"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      ></div>
      <div className="relative z-10 w-full max-w-lg p-10">
        <div className="w-full">
          <div className="flex  mb-4">
            <img src={LogoImage} alt="Logo" className="h-20" />
          </div>
          <h2 className=" text-2xl font-bold text-brand mb-4">WELCOME</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border rounded-md placeholder-brand shadow-sm focus:ring-brand focus:border-brand"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-md placeholder-brand shadow-sm focus:ring-brand focus:border-brand"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="inline-flex items-center ">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-brand after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                <span className="ms-3 text-sm font-medium text-brand">
                  Remember
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="py-1 px-5 bg-brand text-white rounded-3xl font-semibold text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="text-red-500 mt-4">
                Login failed! Please check your credentials.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* <div className="flex flex-1 w-50 h-50">
        <img src={BackgroundImage} alt="backgroundImage" />
      </div> */}
    </div>
  );
};

export default Login;
