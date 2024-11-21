import axios from "axios";

// Service to get all templates of user
const getAllTemplatesService = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8787/api/workout-template/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjkzZDkzMWQ1YzgxZDE4NzM3ZGUwNSIsImlhdCI6MTczMDkwMjExMSwiZXhwIjoxNzMzNDk0MTExfQ.pwyD88jbQQX6aEoOsHp6qUKBYS-X2DZhso1ey44HrEw",
        },
      }
    );
    return response.data.templates;
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
};

// Service to post a template
const postTemplateService = async (template) => {
  try {
    const { name, exercises } = template;

    const response = await axios.post(
      `http://localhost:8787/api/workout-template/`,
      { name, exercises },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjkzZDkzMWQ1YzgxZDE4NzM3ZGUwNSIsImlhdCI6MTczMDkwMjExMSwiZXhwIjoxNzMzNDk0MTExfQ.pwyD88jbQQX6aEoOsHp6qUKBYS-X2DZhso1ey44HrEw",
        },
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
};

// Service to get all exercises of template
const getExercisesService = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8787/api/workout-template/673b50c542ff921043e80f53/exercises",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjkzZDkzMWQ1YzgxZDE4NzM3ZGUwNSIsImlhdCI6MTczMDkwMjExMSwiZXhwIjoxNzMzNDk0MTExfQ.pwyD88jbQQX6aEoOsHp6qUKBYS-X2DZhso1ey44HrEw",
        },
      }
    );
    return response.data.exercises;
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
};

// Service to delete selected template
const deleteTemplateService = async (id) => {
  try {
    await axios.delete(`http://localhost:8787/api/workout-template/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjkzZDkzMWQ1YzgxZDE4NzM3ZGUwNSIsImlhdCI6MTczMDkwMjExMSwiZXhwIjoxNzMzNDk0MTExfQ.pwyD88jbQQX6aEoOsHp6qUKBYS-X2DZhso1ey44HrEw",
      },
    });
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
};

export {
  getExercisesService,
  getAllTemplatesService,
  deleteTemplateService,
  postTemplateService,
};
