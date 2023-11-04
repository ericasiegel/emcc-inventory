import { Cookie } from "../entities/Cookie";
import APIClient from "./api-client";

export default new APIClient<Cookie>('/cookies')