const createAccount = async (
  email: string,
  username: string,
  password: string,
) => {
  try {
    const data = {
      name: username,
      email: email,
      password: password,
    };

    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error while sending request");
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default createAccount;

export async function login(email: string, password: string) {
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error signing in");
    } else {
      console.log(await response.json());

      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function verifyToken() {
  try {
    const response = await fetch("http://localhost:5000/api/users/me", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      console.log("Token successfully verified");
      return true;
    } else {
      throw new Error("Invalid token");
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
