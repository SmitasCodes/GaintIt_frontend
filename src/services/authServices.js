import axios from "axios";

// ================================== Login service ==================================
const loginService = async ({ username, password }) => {
  try {
    const response = await axios.post(`http://localhost:8787/api/users/login`, {
      username,
      password,
    });

    if (response.data) {
      const { token, username } = response.data;
      const user = { token, username };
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response;
  } catch (error) {
    console.error("Error when posting template:", error);
    return error;
  }
};

// ================================== Sign up service =================================
const signupService = async ({ email, username, password }) => {
  try {
    const response = await axios.post(`http://localhost:8787/api/users/`, {
      email,
      username,
      password,
    });

    if (response.data) {
      const { token, username } = response.data;
      const user = { token, username };
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response;
  } catch (error) {
    console.error("Error when posting template:", error);
    return error;
  }
};

export { loginService, signupService };
