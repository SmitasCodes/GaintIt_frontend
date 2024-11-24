import axios from "axios";

// Service to login users
const loginService = async ({ username, password }) => {
  console.log(username, password);

  try {
    const response = await axios.post(`http://localhost:8787/api/users/login`, {
      username,
      password,
    });

    return response;
  } catch (error) {
    console.error("Error when posting template:", error);
  }
};

export { loginService };
