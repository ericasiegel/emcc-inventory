import { Counts } from "../entities/Counts";
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import AddFormModal from "./AddFormModal";
import EditFormModal from "./EditFormModal";
import ColorBadge from "./ColorBadge";
import EditStoreCookiesForm from "./EditStoreCookieForm";
import AddStoreCookiesForm from "./AddStoreCookiesForm";
import useStoreCookies from "../hooks/useStoreCookies";
import { format } from "date-fns";
import DeleteButton from "./DeleteButton";

interface Props {
  id: number;
  size: string;
  count: Counts;
}

const StoreCookieDetailCard = ({ id, size, count }: Props) => {
  const result = useStoreCookies(id, size);
  const cookieData = result.data?.pages.flatMap((page) => page.results)[0];

  const headingSize = size === "mega" ? "Mega" : "Mini";

  const countSize =
    size === "mega" ? count.total_in_store.mega : count.total_in_store.mini;

  return (
    <Card backgroundColor="inherit" variant="unstyled" padding={4} minW="50%">
      <CardHeader>
        <Heading fontSize="3xl">Cookies In Store</Heading>
        <Flex justifyContent="space-between">
          <Heading fontSize="2xl">{headingSize}</Heading>
          <ColorBadge size="30px" count={countSize} />
        </Flex>
        {countSize > 0 ? (
          <EditFormModal header="">
            <EditStoreCookiesForm id={id} cookieSize={size} />
          </EditFormModal>
        ) : (
          <AddFormModal header="">
            <AddStoreCookiesForm id={id} cookieSize={size!} />
          </AddFormModal>
        )}
      </CardHeader>
      <CardBody paddingTop={2}>
        {cookieData?.last_updated ? (
          <>
            <strong> Date Added/Updated: </strong>
            <Text>
              {format(new Date(cookieData.last_updated), "MM/dd/yyyy")}
            </Text>
          </>
        ) : ( "")}
        {cookieData?.id !== undefined && (
          <DeleteButton id={cookieData.id} endpoint="store" />
        )}
      </CardBody>
    </Card>
  );
};

export default StoreCookieDetailCard;
