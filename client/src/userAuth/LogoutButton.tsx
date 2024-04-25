import { Button } from "@chakra-ui/react";

const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.reload();
    }

  return (
    <Button color="#cf6a87" size="lg" variant="link" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
