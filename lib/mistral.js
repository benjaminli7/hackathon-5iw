// curl -X POST http://localhost:11434/api/generate -d '{
//   "model": "mistral",
//   "prompt":"Here is a story about llamas eating grass"
//  }'

const mistral = async function (prompt) {
  await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify({
      model: "mistral",
      prompt: prompt,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((error) => {
      console.error("Error:", error);
    })
    .then((response) => {
      console.log(JSON.stringify(response));
      return response.response;
    });
};

mistral("Here is a story about llamas eating grass").then((response) => {
  console.log(response);
});
