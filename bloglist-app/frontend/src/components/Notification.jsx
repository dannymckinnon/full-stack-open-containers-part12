const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const className = message.includes('invalid') ? 'error' : 'success';

  return (
    <div id="notification" className={className}>
      {message}
    </div>
  );
};

export default Notification;
