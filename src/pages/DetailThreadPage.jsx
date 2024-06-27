import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncCreateComment,
  asyncDownVoteComment,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteComment,
  asyncNeutralizeVoteThreadDetail,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThreadDetail,
} from '../states/threadDetail/actions';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { Box } from '@chakra-ui/react';

export default function DetailThreadPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  const handleUpVoteThread = () => {
    dispatch(asyncUpVoteThreadDetail(id));
  };

  const handleDownVoteThread = () => {
    dispatch(asyncDownVoteThreadDetail(id));
  };

  const handleNeutralizeVoteThread = () => {
    dispatch(asyncNeutralizeVoteThreadDetail(id));
  };

  const handleCommentSubmit = (content) => {
    dispatch(asyncCreateComment({ threadId: id, content }));
  };

  const handleUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment({ threadId: id, commentId }));
  };

  const handleDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment({ threadId: id, commentId }));
  };

  const handleNeutralizeVoteComment = (commentId) => {
    dispatch(asyncNeutralizeVoteComment({ threadId: id, commentId }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <Box>
      <Box className="thread-detail card">
        <ThreadDetail
          {...threadDetail}
          authUser={authUser.id}
          upVoteThreadDetail={handleUpVoteThread}
          downVoteThreadDetail={handleDownVoteThread}
          neutralizeVoteThreadDetail={handleNeutralizeVoteThread}
        />
        <CommentInput addComment={handleCommentSubmit} />
      </Box>

      <CommentList
        comments={threadDetail.comments}
        authUser={authUser.id}
        upVoteComment={handleUpVoteComment}
        downVoteComment={handleDownVoteComment}
        neutralizeVoteComment={handleNeutralizeVoteComment}
      />
    </Box>
  );
}
