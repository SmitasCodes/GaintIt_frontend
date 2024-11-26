import { signupService } from "../../services/authServices";
import { v4 as uuidv4 } from "uuid";

const createDemo = async ({checkAuth}) => {
  const username = uuidv4().replace(/-/g, "").slice(0, 12);
  const emailID = uuidv4().replace(/-/g, "").slice(0, 12);
  const email = `${emailID}@demo.com`;
  const password = uuidv4();
  const collection = "demo";

  try {
    const signupDemo = await signupService({
      email,
      username,
      password,
      collection,
    });

    if (signupDemo.status == 201) {
      checkAuth();
      console.log("Demo account created!");
    } 
  } catch (error) {
    console.error("Error when trying to create demo account", error);
  }
};

export { createDemo };
