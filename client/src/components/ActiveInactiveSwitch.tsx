import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import APIClient from "../services/api-client";
import { AddUpdateCookie } from "../entities/Cookie";
import { Cookie } from "../entities/Cookie";
import useMutateCookies from "../hooks/useMutateCookies";
import { CACHE_KEY_COOKIES } from "../constants";

interface Props {
  id: number;
  name: string;
  is_active: boolean;
}

const ActiveInactiveSwitch = ({ id, name, is_active }: Props) => {
  const apiClient = new APIClient("cookies/");

  const { mutate: activateCookie, error } = useMutateCookies<
    Cookie,
    Error,
    AddUpdateCookie
  >(
    (cookie: AddUpdateCookie) => apiClient.patch(cookie, id),
    () => {},
    [CACHE_KEY_COOKIES]
  );

  const [isActive, setIsActive] = useState(is_active);

  const handleSwitchChange = () => {
    setIsActive(!isActive);

    activateCookie({
      name,
      is_active: !isActive,
    });
  };

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
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
    </>
  );
};

export default ActiveInactiveSwitch;
