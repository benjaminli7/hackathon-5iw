// curl -X POST http://localhost:11434/api/generate -d '{
//   "model": "mistral",
//   "prompt":"Here is a story about llamas eating grass"
//  }'
const axios = require("axios");
const mistral = async function (prompt) {
  console.log("prompt: " + prompt);
  const response = await axios
    .post("http://localhost:11434/api/generate", {
      model: "mistral",
      prompt: prompt,
      stream: false,
    })
    .then((response) => {
      console.log("Response: ", response.data);
      return response.data;
    })

    .catch((error) => {
      console.error("Error:", error);
    });
};

mistral("Here is a story about llamas eating grass").then((response) => {
  console.log(response);
});
