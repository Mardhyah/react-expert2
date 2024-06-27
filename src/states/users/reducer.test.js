
import { describe, expect, it } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './actions';

describe('usersReducer function', () => {
    it('should return initial state when given unknown action', () => {
        const initialState = [];
        const action = { type: 'UNKNOWN' };
        const nextState = usersReducer(initialState, action);
        expect(nextState).toEqual(initialState);
    });

    it('should return users when given by RECEIVE_USERS action', () => {
        const initialState = [];
        const action = {
            type: ActionType.RECEIVE_USERS,
            payload: {
                users: [{ id: 1, name: 'User' }],
            },
        };
        const nextState = usersReducer(initialState, action);
        expect(nextState).toEqual(action.payload.users);
    });
});
