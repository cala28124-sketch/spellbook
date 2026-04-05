import { useState } from "react";
import { login } from "./functions/loginfunctions";
import { verifyToken } from "./functions/loginfunctions";
import { useNavigate } from "react-router-dom";

interface Props {
  setHasAccount: (hasAccount: boolean) => void;
}

const LoginUI = ({ setHasAccount }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    const attempt = await login(email, password);
    setLoggedIn(attempt);
    setInvalid(!attempt);
    if (attempt) {
      navigate("/book");
    }
  };

  return (
    <>
      <div className="font-bold text-2xl mb-3">Login</div>
      <div className="w-full flex items-center flex-col my-2">
        <div className="w-[85%]">Email:</div>
        <input
          className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
          placeholder="example@email.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className="w-full flex items-center flex-col my-2  rounded-xs">
        <div className="w-[85%]">Password:</div>
        <input
          className="w-[85%] h-10 pl-1 bg-gray-200"
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      {invalid && (
        <div className="text-red-500">
          The credentials you entered are incorrect.
        </div>
      )}

      <button
        onClick={submit}
        className="w-25 h-10 min-h-10 bg-blue-400 mt-5 rounded-sm! text-white font-semibold hover:bg-blue-500 transition-colors duration-100 active:bg-blue-600"
      >
        Sign In
      </button>
      <div className="mt-3 font-bold">OR</div>
      <div className="h-10 mb-10">
        <button className="w-40 h-10 border! border-black! border-solid! mt-5 rounded-2xl! text-xs text-black font-semibold hover:bg-gray-100 transition-colors duration-100 active:bg-gray-200">
          <div className="flex items-center gap-3">
            <img src="google-icon.svg" className="h-8 ml-1"></img>Sign in with
            Google
          </div>
        </button>
      </div>
      <div className="h-20 mb-10">
        Don't have an account? Create one
        <strong
          className="cursor-pointer "
          onClick={() => {
            setHasAccount(false);
          }}
        >
          {" "}
          here.
        </strong>
      </div>
    </>
  );
};

export default LoginUI;
