import { useQuery } from "react-query";
import axios from "axios";

export const useAuthQuery = (method, postData) => {
  if (!postData) return null;
  const config = {};
  if (method === "login") {
    config.name = "login";
    config.endpoint = "/auth/login";
  } else {
    config.name = "register";
    config.endpoint = "/auth/register";
  }
  const { isLoading, error, data } = useQuery(
    config.name,
    async () =>
      await axios.post(
        `http://localhost:${process.env.PORT_AUTH}/${config.endpoint}`,
        { postData }
      )
  );
  return { isLoading, error, data };
};
