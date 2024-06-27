import { hideLoading, showLoading } from 'react-redux-loading-bar';
import apiService from '../../utils/apiService';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

// thunk
function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await apiService.fetchLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveLeaderboardsActionCreator, asyncGetLeaderboards };
