import { storage } from "@/main/Registry";
import { Center, Loader } from "@mantine/core";
import Router from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth";

type Props = {
  children: React.ReactNode;
};

export default function Protected(props: Props) {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const auth = storage.get<{ token: string }>("auth");

    if (!auth?.token) Router.replace("/");
    else setIsAuthenticated(true);
  }, []);

  if (isAuthenticated) return <>{props.children}</>;

  return (
    <Center w="100%" h="100%" pl={{ base: 0, lg: 300 }}>
      <Loader size="lg" />
    </Center>
  );
}
