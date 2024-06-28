
import {
  describe,
  beforeEach,
  afterEach,
  it,
  vi,
  expect,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import apiService from '../../utils/apiService';
import {
  asyncGetLeaderboards,
  receiveLeaderboardsActionCreator,
} from './actions';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'mar',
      email: 'mar@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'yah',
      email: 'yah@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncGetLeaderboards thunk', () => {
  beforeEach(() => {
    apiService._fetchLeaderboards = apiService.fetchLeaderboards;
  });

  afterEach(() => {
    apiService.fetchLeaderboards = apiService._fetchLeaderboards;

    delete apiService._fetchLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {

    apiService.fetchLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = vi.fn();

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {

    apiService.fetchLeaderboards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    global.alert = vi.fn();
    await asyncGetLeaderboards()(dispatch);


    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
