import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import asyncPopulateUsersAndThreads from '../states/shared/actions';
import {
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncUpVoteThread,
} from '../states/threads/actions';
import ThreadList from '../components/ThreadList';

export default function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((state) => state);

  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = new Set(threads.map((thread) => thread.category));

  const handleUpVoteThread = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const handleDownVoteThread = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const handleNeutralizeVoteThread = (threadId) => {
    dispatch(asyncNeutralizeVoteThread(threadId));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <div className="container">
      <div>
        <div className="homepage_content">
          <div>
            <Button
              type="button"
              onClick={() => setFilter('')}
            >
              Show All
            </Button>
            {Array.from(categories).map((category) => (
              <Button
                type="button"
                key={category}
                onClick={() => setFilter(category)}
              >
                #{category}
              </Button>
            ))}
          </div>
          <ThreadList
            threads={
              filter
                ? threadList.filter((thread) => thread.category === filter)
                : threadList
            }
            upVote={handleUpVoteThread}
            downVote={handleDownVoteThread}
            neutralVote={handleNeutralizeVoteThread}
          />
        </div>
        <div className="homepage__action">
          <Link to="/add-thread">
            <Button
              variant="contained"
              className="action"
              colorScheme="blue"
              position="fixed"
              bottom="2rem"
              right="2rem"
            >
              Add New Thread
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
