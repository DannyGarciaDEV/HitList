const Notification = ({ message, notificationType }) => {
    if (message === null) {
      return null;
    }
  
    return (
      <div className={`notification-container ${notificationType}`}>
        {message}
      </div>
    );
  };
  
  export default Notification;
  