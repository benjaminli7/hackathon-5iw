import { getUsers } from "@/api/users";
import { Button, Stack } from "@mantine/core";
import { fakeScenario } from "@/app/utils";

export default async function Home() {
  const users = await getUsers();
  // console.log(users);
  const response = await fakeScenario("+33612345678");

  return (
    <Stack>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} <br />
          {user.email}
          <Button>Get age</Button>
        </div>
      ))}
    </Stack>
  );
}
