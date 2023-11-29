const TimeAgo = ({ gettime }) => {
  const timestamp = new Date(gettime);
  const seconds = Math.floor((new Date() - timestamp) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'year' : 'years'} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    const remainingDays = Math.floor((seconds % 2592000) / 86400);
    return `${interval} ${interval === 1 ? 'month' : 'months'} ${remainingDays > 0 ? remainingDays + ' day' + (remainingDays > 1 ? 's' : '') : ''} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    const remainingHours = Math.floor((seconds % 86400) / 3600);
    return `${interval} ${interval === 1 ? 'day' : 'days'} ${remainingHours > 0 ? remainingHours + ' hr' + (remainingHours > 1 ? 's' : '') : ''} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return `${interval} ${interval === 1 ? 'hr' : 'hrs'} ${remainingMinutes > 0 ? remainingMinutes + ' min' + (remainingMinutes > 1 ? 's' : '') : ''} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'min' : 'mins'} ago`;
  }

  return `${Math.floor(seconds)} seconds ago`;
};

export default TimeAgo;
