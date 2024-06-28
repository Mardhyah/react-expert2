
import {
    describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import apiService from '../../utils/apiService';
import asyncPopulateUsersAndThreads from './actions';
import { receiveThreadsActionCreator } from '../threads/actions';
import { receiveUsersActionCreator } from '../users/actions';

const fakeThreadsResponse = [
    {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
    },
    {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
    },
];

const fakeUsersResponse = [
    {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
    },
    {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
    },
    {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
    },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
    let originalFetchAllUsers;
    let originalFetchAllThreads;
    let originalAlert;

    beforeEach(() => {
        originalFetchAllUsers = apiService.fetchAllUsers;
        originalFetchAllThreads = apiService.fetchAllThreads;
        originalAlert = global.alert;

        apiService.fetchAllUsers = vi.fn();
        apiService.fetchAllThreads = vi.fn();

        global.alert = vi.fn();
    });

    afterEach(() => {
        apiService.fetchAllUsers = originalFetchAllUsers;
        apiService.fetchAllThreads = originalFetchAllThreads;
        global.alert = originalAlert;
    });

    it('should dispatch actions correctly when data fetching is successful', async () => {
        apiService.fetchAllUsers.mockResolvedValue(fakeUsersResponse);
        apiService.fetchAllThreads.mockResolvedValue(fakeThreadsResponse);
        const dispatch = vi.fn();

        await asyncPopulateUsersAndThreads()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
        expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch actions and call alert correctly when data fetching fails', async () => {
        apiService.fetchAllUsers.mockRejectedValue(fakeErrorResponse);
        apiService.fetchAllThreads.mockRejectedValue(fakeErrorResponse);
        const dispatch = vi.fn();

        await asyncPopulateUsersAndThreads()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});
