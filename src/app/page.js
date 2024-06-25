import { getUsers } from "@/api/users";
import { Button, Stack } from "@mantine/core";

export default async function Home() {
  const users = await getUsers();
  console.log("first");
  console.log(users);
  return (
    <Stack>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} <br />
          {user.email}
        </div>
      ))}
    </Stack>
  );
}
