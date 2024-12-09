import axios from "axios";

// Service to get all templates of user
const getAllTemplatesService = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8787/api/workout-template/",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.templates;
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
};

// Service to post a template
const postTemplateService = async (template, token) => {
  try {
    const { name, exercises } = template;

    const response = await axios.post(
      `http://localhost:8787/api/workout-template/`,
      { name, exercises },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error when posting template:", error);
  }
};

// Service to update template
const updateTemplateService = async (id, template, token) => {
  const { name, exercises } = template;

  try {
    const response = await axios.put(
      `http://localhost:8787/api/workout-template/${id}`,
      { name, exercises },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error when updating template:", error);
  }
};

// Service to delete template
const deleteTemplateService = async (id, token) => {
  try {
    await axios.delete(`http://localhost:8787/api/workout-template/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
};

// Service to get all exercises of template
// const getExercisesService = async (token) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8787/api/workout-template/${token}/exercises`,
//       {
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjkzZDkzMWQ1YzgxZDE4NzM3ZGUwNSIsImlhdCI6MTczMDkwMjExMSwiZXhwIjoxNzMzNDk0MTExfQ.pwyD88jbQQX6aEoOsHp6qUKBYS-X2DZhso1ey44HrEw",
//         },
//       }
//     );
//     return response.data.exercises;
//   } catch (error) {
//     console.error("Error fetching exercises:", error);
//   }
// };

export {
  // getExercisesService,
  getAllTemplatesService,
  deleteTemplateService,
  postTemplateService,
  updateTemplateService,
};
