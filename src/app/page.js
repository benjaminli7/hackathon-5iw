import { getUsers } from "@/api/users";
import { Button, Stack } from "@mantine/core";
import { fakeScenario } from "@/app/utils";

export default async function Home() {
  const users = await getUsers();
  // console.log(users);
  const response = await fakeScenario("+33612345678");

  return (
    <Stack>
      hello world
    </Stack>
  );
}
