import { useState } from "react";
import createAccount from "./functions/loginfunctions";

interface Props {
  setHasAccount: (hasAccount: boolean) => void;
}

const CreateAnAccountUI = ({ setHasAccount }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validEmail, setValidEmail] = useState(true);
  const [emailExists, setEmailExists] = useState(false);

  function validateEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const submit = async () => {
    const valid = validateEmail(email);

    setValidEmail(valid);
    if (valid && password == confirmPassword) {
      const attempt = await createAccount(email, username, password);
      if (!attempt) {
        setEmailExists(true);
      } else {
        setEmailExists(false);
        setHasAccount(true);
      }
    }
  };

  return (
    <>
      <div className="font-bold text-2xl mb-3">Create an account</div>
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
      <div className="w-full flex items-center flex-col my-2">
        <div className="w-[85%]">Username:</div>
        <input
          className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
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
      <div className="w-full flex items-center flex-col my-2  rounded-xs">
        <div className="w-[85%]">Confirm Password:</div>
        <input
          className="w-[85%] h-10 pl-1 bg-gray-200"
          placeholder="password"
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
      </div>

      {confirmPassword.length > 0 && confirmPassword != password && (
        <div className="text-red-500">Error: both passwords must match</div>
      )}
      {validEmail || (
        <div className="text-red-500">Enter a valid email address</div>
      )}
      {emailExists && (
        <div className="text-red-500">
          An account with that email already exists.
        </div>
      )}

      <button
        onClick={submit}
        className="w-45 h-10 min-h-10 bg-blue-400 mt-5 rounded-sm! text-white font-semibold hover:bg-blue-500 transition-colors duration-100 active:bg-blue-600"
      >
        Create my account
      </button>

      <div className="h-20 mb-10 mt-10">
        Already have an account? Click
        <strong
          className="cursor-pointer "
          onClick={() => {
            setHasAccount(true);
          }}
        >
          {" "}
          here
        </strong>{" "}
        to sign in.
      </div>
    </>
  );
};

export default CreateAnAccountUI;
