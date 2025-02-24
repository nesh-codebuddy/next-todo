import React from "react";
import { Menu } from "@mantine/core";
import {
  IconDeviceIpadPlus,
  IconLogin,
  IconMenu2,
  IconEdit,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import useStore from "@/store/store";

const TopMenu = () => {
  const router = useRouter();
  const { username } = useStore();

  const handleLogin = () => {
    if (username) {
      localStorage.clear();
      window.location.reload();
    } else {
      router.push({ pathname: "/user-authentication" });
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconMenu2 />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconDeviceIpadPlus />}
          onClick={() => router.push("/tasks/new")}
          disabled={!username}
        >
          Add Todo
        </Menu.Item>
        <Menu.Item
          leftSection={<IconEdit />}
          onClick={() =>
            router.push({
              pathname: "/user-authentication",
              query: {
                edit: true,
              },
            })
          }
          disabled={!username}
        >
          Edit User
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogin />} onClick={handleLogin}>
          {username ? "Log Out" : "Log In"}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TopMenu;
