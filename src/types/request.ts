import { z } from "zod";
import {
  RequestsResponseSchema,
  RequestStatusSchema,
} from "../schemas/request.js";

export type RequestStatus = z.infer<typeof RequestStatusSchema>;

export type RequestsParams = {
  page?: number;
  size?: number;
  status?: RequestStatus;
};

export type RequestsResponse = z.infer<typeof RequestsResponseSchema>;
