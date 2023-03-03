import { builder } from "./pothos";
import "./types/MyMovie";
import "./types/User";

export const schema = builder.toSchema();
