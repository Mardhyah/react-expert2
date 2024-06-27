function calculatePostedTime(date) {
  const currentDate = new Date();
  const postingDate = new Date(date);
  const difference = currentDate - postingDate;
  const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  const differenceInHours = Math.floor(difference / (1000 * 60 * 60));
  const differenceInMinutes = Math.floor(difference / (1000 * 60));
  const differenceInSeconds = Math.floor(difference / 1000);

  if (differenceInDays > 0) {
    return `${differenceInDays} days ago`;
  }
  if (differenceInHours > 0) {
    return `${differenceInHours} hours ago`;
  }
  if (differenceInMinutes > 0) {
    return `${differenceInMinutes} minutes ago`;
  }
  if (differenceInSeconds > 0) {
    return `${differenceInSeconds} seconds ago`;
  }
  return 'just now';
}

export { calculatePostedTime };
