import React from 'react';

const Ticket = ({ data }) => {
  return (
    <div className="ticket-confirmation">
      <h2>Ticket Confirmation</h2>
      <div className="ticket-details">
        <img src={data.avatarUrl} alt="Avatar" className="ticket-avatar" />
        <p><strong>Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Ticket Type:</strong> {data.selectedTicketType.replace('V', 'V ')} ACCESS</p>
        <p><strong>Quantity:</strong> {data.ticketQuantity}</p>
        <p><strong>Total:</strong> ${data.ticketPrice * data.ticketQuantity}</p>
        {data.aboutProject && <p><strong>About Project:</strong> {data.aboutProject}</p>}
      </div>
    </div>
  );
};

export default Ticket;
