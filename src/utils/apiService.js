const apiService = (() => {
  const API_BASE = 'https://forum-api.dicoding.dev/v1';


  async function signUp({ name, email, password }) {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function signIn({ email, password }) {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.token;
  }


  async function neutralizeVoteOnThread(threadId) {
    const response = await fetchWithAuthorization(
      `${API_BASE}/threads/${threadId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }


  async function upVoteComment(threadId, commentId) {
    const response = await fetchWithAuthorization(
      `${API_BASE}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }


  async function downVoteComment(threadId, commentId) {
    const response = await fetchWithAuthorization(
      `${API_BASE}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }

  async function neutralizeVoteOnComment(threadId, commentId) {
    const response = await fetchWithAuthorization(
      `${API_BASE}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }

  function storeAccessToken(token) {
    localStorage.setItem('authToken', token);
  }

  function retrieveAccessToken() {
    return localStorage.getItem('authToken');
  }

  async function fetchWithAuthorization(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
    });
  }


  async function fetchUserProfile() {
    const response = await fetchWithAuthorization(`${API_BASE}/users/me`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function fetchAllUsers() {
    const response = await fetch(`${API_BASE}/users`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.users;
  }

  async function createNewThread({ title, body, category = 'General' }) {
    const response = await fetchWithAuthorization(`${API_BASE}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.thread;
  }

  async function fetchAllThreads() {
    const response = await fetch(`${API_BASE}/threads`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.threads;
  }

  async function fetchThreadDetails(id) {
    const response = await fetch(`${API_BASE}/threads/${id}`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.detailThread;
  }

  async function postComment({ content, threadId }) {
    const response = await fetchWithAuthorization(
      `${API_BASE}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.comment;
  }

  async function upVoteThread(threadId) {
    const response = await fetchWithAuthorization(
      `${API_BASE}/threads/${threadId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }


  async function downVoteThread(threadId) {
    const response = await fetchWithAuthorization(
      `${API_BASE}/threads/${threadId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }



  async function fetchLeaderboards() {
    const response = await fetch(`${API_BASE}/leaderboards`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.leaderboards;
  }

  return {
    storeAccessToken,
    retrieveAccessToken,
    signUp,
    signIn,
    fetchUserProfile,
    fetchAllUsers,
    createNewThread,
    fetchAllThreads,
    fetchThreadDetails,
    postComment,
    upVoteThread,
    downVoteThread,
    neutralizeVoteOnThread,
    upVoteComment,
    downVoteComment,
    neutralizeVoteOnComment,
    fetchLeaderboards,
  };
})();

export default apiService;
