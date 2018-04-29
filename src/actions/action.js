import { START_APP } from "./types";
import {
  makeRequestActionCreator,
  makeActionCreator
} from "../utils/reduxActions";

export const startApp = makeActionCreator(START_APP);

export default {
  startApp
};
