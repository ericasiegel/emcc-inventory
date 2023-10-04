import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import APIClient, { AddUpdateCookie } from "../services/api-client";

interface Props {
  id: number;
  name: string;
  is_active: boolean;
}

const ActiveInactiveSwitch = ({ id, name, is_active }: Props) => {
  const apiClient = new APIClient('cookies/')
  const queryClient = useQueryClient();
  const activateCookie = useMutation({
    mutationFn: (cookie: AddUpdateCookie) =>
      apiClient
        .updateActive(cookie, id)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cookies"],
      });
    },
  });

  const [isActive, setIsActive] = useState(is_active);

  const handleSwitchChange = () => {
    setIsActive(!isActive);

    activateCookie.mutate({
      name,
      is_active: !isActive,
    });
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <FormControl paddingTop={4} display="flex" alignItems="center">
        <FormLabel htmlFor="is_active" mb="0">
          {is_active ? <Text>Active</Text> : <Text>Inactive</Text>}
        </FormLabel>
        <Switch
          id="email-alerts"
          colorScheme="green"
          isChecked={is_active}
          onChange={handleSwitchChange}
        />
      </FormControl>
    </Flex>
  );
};

export default ActiveInactiveSwitch;
