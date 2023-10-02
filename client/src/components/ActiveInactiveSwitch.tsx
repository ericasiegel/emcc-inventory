import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface ActivateCookie {
  name: string;
  is_active: boolean;
}

interface Props {
  id: number;
  name: string;
  is_active: boolean;
}

const ActiveInactiveSwitch = ({ id, name, is_active }: Props) => {
  const queryClient = useQueryClient();
  const activateCookie = useMutation({
    mutationFn: (cookie: ActivateCookie) =>
      axios
        .patch<ActivateCookie>(`http://127.0.0.1:8000/bakery/cookies/${id}/`, cookie)
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
          colorScheme="pink"
          isChecked={isActive}
          onChange={handleSwitchChange}
        />
      </FormControl>
    </Flex>
  );
};

export default ActiveInactiveSwitch;
