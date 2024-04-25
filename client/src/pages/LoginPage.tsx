import {
    AbsoluteCenter,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import LoginForm from "../userAuth/LoginForm";
import logo from "../assets/emcc-logo-white_1024x1024.webp";

const LoginPage = () => {
    
  return (
    <AbsoluteCenter>
      <Card bgColor="#cf6a87" align="center" variant='elevated' boxShadow='dark-lg' padding={4} >
        <CardHeader>
          <HStack>
            <Heading color='white'>Login to </Heading>
            <Image src={logo} boxSize="150px" alt="Epic Mega Cookie Co Logo" />
            <Heading color='white'>Inventory </Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </AbsoluteCenter>
  );
};

export default LoginPage;
