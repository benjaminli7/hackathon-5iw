import { getUsers } from "@/api/users";
import { Button, Stack } from "@mantine/core";
import { getAgeFromPrompt } from "@/app/utils";

export default async function Home() {
  const users = await getUsers();
  // const response = await getAgeFromPrompt("Salut, comment ça va ?", "Robert");
  // console.log(response.choices[0].message.content);

  return (
    <Stack>
      hello world
    </Stack>
  );
}
