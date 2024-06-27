import { hideLoading, showLoading } from 'react-redux-loading-bar';
import apiService from '../../utils/apiService';
import { receiveThreadsActionCreator } from '../threads/actions';
import { receiveUsersActionCreator } from '../users/actions';

const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const users = await apiService.fetchAllUsers();
    const threads = await apiService.fetchAllThreads();

    dispatch(receiveUsersActionCreator(users));
    dispatch(receiveThreadsActionCreator(threads));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default asyncPopulateUsersAndThreads;
