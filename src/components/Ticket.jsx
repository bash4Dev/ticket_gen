const Ticket = ({ data, step }) => {
  return (
    <>
      {/* Confirmation Summary Card */}
        <div className="confirmation-wrapper">
        <h2 className="confirmation-title">Confirm Your Ticket</h2>
        <div className="confirmation-card">
          <div className="user-avatar">
            {data.avatarUrl ? (
              <img
                src={data.avatarUrl}
                alt="User Avatar"
                className="ticket-avatar"
              />
            ) : (
              <div className="avatar-placeholder">No Avatar</div>
            )}
          </div>
          <div className="user-details">
            <div className="ticket-info">
              <p>
                <strong>Name:</strong> {data.fullName}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Ticket Type:</strong> {data.selectedTicketType}
              </p>
              <p>
                <strong>Quantity:</strong> {data.ticketQuantity}
              </p>
              {data.aboutProject && (
                <p>
                  <strong>About:</strong> {data.aboutProject}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Ticket;