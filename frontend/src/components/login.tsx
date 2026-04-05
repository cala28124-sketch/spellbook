import { useState, useEffect, useRef } from "react";
import LoginUI from "./loginUI";
import CreateanAccountUI from "./createAccountUI";

function Login() {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-[75%] w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] bg-white rounded-2xl shadow-lg flex items-center flex-col pt-[3%] overflow-auto">
          {hasAccount ? (
            <LoginUI setHasAccount={setHasAccount} />
          ) : (
            <CreateanAccountUI setHasAccount={setHasAccount} />
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
