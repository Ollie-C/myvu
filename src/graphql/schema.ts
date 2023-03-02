import { builder } from "./pothos";
import "./types/Movie";
import "./types/User";

export const schema = builder.toSchema();
