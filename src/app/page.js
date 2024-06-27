import { getUsers } from "@/api/users";
import { Button, Stack } from "@mantine/core";
import { getAgeFromPrompt } from "@/app/utils";

export default async function Home() {
  const users = await getUsers();
  const response = await getAgeFromPrompt("Salut, comment ça va ?", "Robert");
  console.log("D'après la discussion, l'âge estimé est de", response, "ans");

  return (
    <Stack>
      hello world
    </Stack>
  );
}
