import { describe, it, expect } from 'vitest';
import { ActionType } from './actions';
import authUserReducer from './reducer';


describe('authUserReducer funtion', () => {
    it('should return the initial state when given by unknown action', () => {
        const initialState = null;
        const action = { type: 'UNKNOWN' };

        const nextState = authUserReducer(initialState, action);
        expect(nextState).toBe(initialState);
    });

    it('should return authUser when given by authUser/set action', () => {
        const initialState = null;
        const action = {
            type: ActionType.SET_AUTH_USER,
            payload: {
                authUser: {
                    id: 'test123',
                    name: 'test123',
                    email: 'test123@example.com',
                    avatar: 'https://generated-image-url.jpg',
                },
            },
        };

        const nextState = authUserReducer(initialState, action);
        expect(nextState).toBe(action.payload.authUser);
    });
    it('should return null when given by authUser/unset action', () => {
        const initialState = null;
        const action = {
            type: ActionType.UNSET_AUTH_USER,
            payload: {
                authUser: null,
            },
        };
        const nextState = authUserReducer(initialState, action);
        expect(nextState).toBeNull();
    });
});
