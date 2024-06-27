import { hideLoading, showLoading } from 'react-redux-loading-bar';
import apiService from '../../utils/apiService';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

// Thunks
function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await apiService.fetchThreadDetails(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateComment({ content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { threadDetail } = getState();

    try {
      const comment = await apiService.postComment({
        content,
        threadId: threadDetail.id,
      });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(upVoteThreadDetailActionCreator(authUser.id));

    try {
      await apiService.upVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(downVoteThreadDetailActionCreator(authUser.id));

    try {
      await apiService.downVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncNeutralizeVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));

    try {
      await apiService.neutralizeVoteOnThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteCommentActionCreator(commentId, authUser.id));

    try {
      await apiService.upVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteCommentActionCreator(commentId, authUser.id));
    }
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteCommentActionCreator(commentId, authUser.id));

    try {
      await apiService.downVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteCommentActionCreator(commentId, authUser.id));
    }
  };
}

function asyncNeutralizeVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralizeVoteCommentActionCreator(commentId, authUser.id));

    try {
      await apiService.neutralizeVoteOnComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentActionCreator(commentId, authUser.id));
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  createCommentActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};
