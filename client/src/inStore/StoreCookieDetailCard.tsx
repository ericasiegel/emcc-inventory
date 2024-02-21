import { Counts } from "../counts/Counts";
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ColorBadge from "../counts/ColorBadge";
import { format } from "date-fns";
import DeleteButton from "../components/DeleteButton";
import StoreCookiesForm from "./StoreCookiesForm";
import useGetData from "../hooks/useGetData";
import { Store } from "./StoreCookie";
import FormModal from "../components/FormModal";

interface Props {
  id: number;
  size: string;
  count?: Counts;
  endpoint: string;
}

const StoreCookieDetailCard = ({ id, size, count, endpoint }: Props) => {

  const {isOpen: addIsOpen, onOpen: addOnOpen, onClose: addOnClose } = useDisclosure();
  const {isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();

  const result = useGetData<Store>({ endpoint, id, size});
  const cookieData = result.data?.pages.flatMap((page) => page.results)[0];
  const headingSize = size === "mega" ? "Mega" : "Mini";

  const countSize =
    size === "mega" ? count?.total_in_store.mega : count?.total_in_store.mini;

  return (
    <Card backgroundColor="inherit" variant="unstyled" padding={4} minW="50%">
      <CardHeader>
        <Heading fontSize="3xl">Cookies In Store</Heading>
        <Flex justifyContent="space-between">
          <Heading fontSize="2xl">{headingSize}</Heading>
          <ColorBadge size="30px" count={countSize!} />
        </Flex>
        {countSize! > 0 ? (
          <FormModal header={`Edit quantity of ${size} cookies in store`} isAddForm={false} onClose={editOnClose} isOpen={editIsOpen} onOpen={editOnOpen}>
            {cookieData ? (
              <StoreCookiesForm id={id} cookieSize={size} mode='edit' inStoreQuantityId={cookieData.id} onClose={editOnClose} />
            ) : null}
          </FormModal>
        ) : (
          <FormModal header={`Add quantity of ${size} cookies in store`}  isAddForm={true} onClose={addOnClose} isOpen={addIsOpen} onOpen={addOnOpen}>
            <StoreCookiesForm id={id} cookieSize={size!} mode="add" inStoreQuantityId={0} onClose={addOnClose} />
          </FormModal>
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
