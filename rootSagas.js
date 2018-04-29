import { takeLatest } from "redux-saga/effects";
import { START_APP } from "./src/actions/types";

export function* getLatest() {
  // maybe we'll have to get some data here
}

export default function* rootSaga() {
  yield takeLatest(START_APP, getLatest);
}
