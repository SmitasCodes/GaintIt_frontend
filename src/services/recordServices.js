import axios from "axios";

// Service to post a record
const postRecordService = async (record, token) => {
  const { template_id, exercises } = record;
  try {
    const response = await axios.post(
      `http://localhost:8787/api/workout-record/`,
      { template_id, exercises },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error when posting workout record:", error);
  }
};

// Get all user workout records
const getRecordsService = async (token) => {
  try {
    const response = await axios.get(
      `http://localhost:8787/api/workout-record/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );


    return response.data.records;
  } catch (error) {
    console.error("Error when trying to get all the user records:", error);
  }
};


export { postRecordService, getRecordsService };
