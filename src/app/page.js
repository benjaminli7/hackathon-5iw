import { getUsers } from "@/app/api/users";
import { Button } from "@mantine/core";

export default async function Home() {
  const users = await getUsers()
  console.log(users)
  return <Button>hello world</Button>;
}
