import { Button, Center, FormControl, Input } from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <>
      <form>
        {/* <form onSubmit={handleFormSubmit}> */}
        <FormControl>
          <Input
            //   ref={usernameData}
            backgroundColor="white"
            placeholder="Username"
            size="lg"
            mb={2}
          />
          <Input
            //   ref={passwordData}
            backgroundColor="white"
            placeholder="Password"
            size="lg"
          />
          <Center>
            <Button colorScheme="purple" size="lg" my={3}>
              Login
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default LoginForm;
