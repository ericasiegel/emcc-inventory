import { Cookie } from "./Cookie";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";
import CookieCounts from "../counts/CookieCounts";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import { Link } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import ActiveInactiveSwitch from "./ActiveInactiveSwitch";
import CookieDescriptionCard from "./CookieDescriptionCard";

interface Props {
  cookie: Cookie;
}

const CookieCard = ({ cookie }: Props) => {
  const imgUrl =
    cookie.images && cookie.images?.length > 0
      ? cookie.images[0].image
      : noImage;
  const inactiveCookie = !cookie.is_active ? "40%" : "100%";

  return (
    <Card backgroundColor="inherit" opacity={inactiveCookie} height="100%">
      <Image src={imgUrl} alt={cookie.name} width="100%" height="auto" />
      <CardHeader borderBottom="1px" justifyContent="center">
        <Link to={"/cookies/" + cookie.slug}>
          <Heading as="em" color="#941c3e" fontSize="3xl">
            {cookie.name}
          </Heading>
          <CookieDescriptionCard description={cookie?.description} />
        </Link>
        <Flex
          justifyContent="center" // Center horizontally
          alignItems="center" // Center vertically
        >
          <ActiveInactiveSwitch
            cookie={cookie}
          />
        </Flex>
      </CardHeader>
      <CardBody paddingX={3} height="100%">
        <Link to={"/cookies/" + cookie.slug}>
          <CookieCounts counts={cookie.counts} />
        </Link>
      </CardBody>
      <CardFooter justifyContent="center">
        <DeleteButton endpoint="cookies" id={cookie.id} />
      </CardFooter>
    </Card>
  );
};

export default CookieCard;
