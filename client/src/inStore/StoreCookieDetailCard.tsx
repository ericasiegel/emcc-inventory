import { Counts } from "../counts/Counts";
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import AddFormModal from "../components/AddFormModal";
import EditFormModal from "../components/EditFormModal";
import ColorBadge from "../counts/ColorBadge";
import { format } from "date-fns";
import DeleteButton from "../components/DeleteButton";
import StoreCookiesForm from "./StoreCookiesForm";
import useGetData from "../hooks/useGetData";
import { Store } from "./StoreCookie";

interface Props {
  id: number;
  size: string;
  count: Counts;
  endpoint: string;
}

const StoreCookieDetailCard = ({ id, size, count, endpoint }: Props) => {
  const result = useGetData<Store>({ endpoint, id, size});
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
            {cookieData ? (
              <StoreCookiesForm id={id} cookieSize={size} mode='edit' inStoreQuantityId={cookieData.id} />
            ) : null}
          </EditFormModal>
        ) : (
          <AddFormModal header="">
            <StoreCookiesForm id={id} cookieSize={size!} mode="add" inStoreQuantityId={0} />
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
        ) : (
          ""
        )}
        {cookieData?.id !== undefined && (
          <DeleteButton id={cookieData.id} endpoint="store" />
        )}
      </CardBody>
    </Card>
  );
};

export default StoreCookieDetailCard;
