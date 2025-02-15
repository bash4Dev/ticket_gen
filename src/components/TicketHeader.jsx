function TicketHeader({ step, totalSteps }) {
  const progressPercentage = (step / totalSteps) * 100;
  let title = "";
  if (step === 1) title = "Ticket Selection";
  else if (step === 2) title = "Attendee Details";
  else if (step === 3) title = "Ready";

  return (
    <div className="ticket-header">
      <div className="selectionSteps">
        <p id="title">{title}</p>
        <span id="steps">{`Step ${step}/${totalSteps}`}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  );
}

export default TicketHeader;