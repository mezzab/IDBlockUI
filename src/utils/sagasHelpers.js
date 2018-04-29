import { call, put } from 'redux-saga/effects';

export function* performRequest(service, requestActionCreator) {
  yield put(requestActionCreator.pending);
  try {
    const response = yield call(service);
    yield put(requestActionCreator.success(response));
  } catch (error) {
    console.log('Oops', 'Something went wrong! Check your connection and try again. ', 'error');
    yield put(requestActionCreator.error(error));
  }
}

export default {
  performRequestSmart: performRequest,
};
