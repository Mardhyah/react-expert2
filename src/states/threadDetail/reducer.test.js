/**
 * Test scenarios for threadDetailReducer function
 *
 * - threadDetailReducer function
 *   - should return initial state when given unknown action
 *   - should return threadDetail when given by RECEIVE_THREAD_DETAIL action
 *   - should handle CREATE_COMMENT action
 *   - should handle UP_VOTE_THREAD_DETAIL action
 *   - should handle DOWN_VOTE_THREAD_DETAIL action
 *   - should handle NEUTRALIZE_VOTE_THREAD_DETAIL action
 */
import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './actions';

describe('threadDetailReducer function', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: { id: 1, title: 'Thread' },
      },
    };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should handle CREATE_COMMENT action', () => {
    const initialState = { id: 1, title: 'Thread', comments: [] };
    const action = {
      type: ActionType.CREATE_COMMENT,
      payload: {
        comment: { id: 1, content: 'Comment' },
      },
    };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.comments).toContainEqual(action.payload.comment);
  });

  it('should handle UP_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 1,
      title: 'Thread',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: { userId: 'user123' },
    };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.upVotesBy).toContain('user123');
  });

  it('should handle DOWN_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 1,
      title: 'Thread',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: { userId: 'user123' },
    };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.downVotesBy).toContain('user123');
  });

  it('should handle NEUTRALIZE_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 1,
      title: 'Thread',
      upVotesBy: ['user123'],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
      payload: { userId: 'user123' },
    };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.upVotesBy).not.toContain('user123');
  });
});
