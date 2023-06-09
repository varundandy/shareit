import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { useGoogleLogin } from "@react-oauth/google";
import { client } from "../client";
import { redirect, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../store/UserContext";
import { User, UserInfo } from "../types/interface";
import { userQuery } from "../utils/data";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      );
      const profileInfo = await response.json();
      const userObj = JSON.stringify(profileInfo);
      localStorage.setItem("user", userObj);
      const { name, sub: googleId, picture } = profileInfo;
      const doc = {
        _id: googleId,
        _type: "user",
        userName: name,
        image: picture,
      };
      client.createIfNotExists(doc).then((data) => {
        console.log("User Created in Sanity");
        console.log(data);
      });
      const query = userQuery(profileInfo?.sub);
      const data = await client.fetch(query);
      await setUser(data[0]);
      navigate("/", { replace: true });
    },
    onError: () => console.log("error"),
  });

  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          typeof="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay">
          <div>
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex flex-row justify-center items-center p-3 mt-4 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
            >
              <FcGoogle className="mr-4" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
