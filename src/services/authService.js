// src/services/authService.js
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }

    if (json.token) {
      localStorage.setItem("token", json.token);
      // users authenticated by signing up will also remain signed in
    }

    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.token) {
      localStorage.setItem("token", json.token); // add this line to store the JWT token in localStorage
      const user = JSON.parse(atob(json.token.split(".")[1]));
      //   One thing to note with the above code is the JSON.parse(atob(json.token.split('.')[1])); line.
      // This part of the code splits the JWT string into its three components using the dot as a delimiter and selects the second element (index 1), which is the payload containing the user data.
      // A JWT is composed of three parts: a header, a payload, and a signature. These parts are encoded in Base64Url format and are separated by . dots . The header contains the token type and the hashing algorithm used, the payload contains the claims (data about the user and other metadata), and the signature is used to verify the token.
      // atopb decodes the payload portion[1] of the token

      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = JSON.parse(atob(token.split(".")[1]));
  return user;
};

const signout = () =>{
    localStorage.removeItem("token")
    // when you remove the token in local storage memory it will log out the user
}

export default {
  signup,
  signin,
  getUser,
  signout
};
