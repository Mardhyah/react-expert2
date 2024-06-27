import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="error-page">
      <h1>Oops! 404</h1>
      <button type="button">
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
}
