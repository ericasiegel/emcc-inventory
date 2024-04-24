import { Button } from "@chakra-ui/react";

const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.reload();
    }

  return (
    <Button colorScheme="black" size="lg" variant="link" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
