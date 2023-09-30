import { Cookie } from "../entities/Cookie";
import { Card, CardBody, CardFooter, Heading, Image } from "@chakra-ui/react";
import CookieCounts from "./CookieCounts";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import { Link } from "react-router-dom";
import DeleteCookieButton from "./DeleteCookieButton";

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
        <Link to={"/cookies/" + cookie.slug}>
        <CardBody paddingX={3}>
          <Heading as="em" color="#941c3e" fontSize="3xl">
            {cookie.name}
          </Heading>
          <CookieCounts counts={cookie.counts} />
        </CardBody>
    </Link>
    <CardFooter>
      <DeleteCookieButton id={cookie.id} />
    </CardFooter>
      </Card>
  );
};

export default CookieCard;
