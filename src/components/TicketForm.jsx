// src/components/TicketForm.js
import React, { useState, useEffect } from "react";
import AvatarUpload from "./AvatarUpload";
import TicketHeader from "./TicketHeader";

const TicketForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatarUrl: "",
    selectedTicketType: "",
    ticketQuantity: 1,
    aboutProject: ""
  });
  
  const [remainingTickets] = useState({
    regular: 20,
    vip: 20,
    vvip: 20
  });

  const [errors, setErrors] = useState({});
  const totalSteps = 3;
  const [step, setStep] = useState(1);

  // Load form data and step from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("ticketData");
    const savedStep = localStorage.getItem("ticketStep");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setStep(Number(savedStep));
    }
  }, []);

  // useEffect to persist form data and steps in localStorage
  useEffect(() => {
    localStorage.setItem("ticketData", JSON.stringify(formData));
    localStorage.setItem("ticketStep", step);
  }, [formData, step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAvatarUpload = (url) => {
    setFormData((prev) => ({ ...prev, avatarUrl: url }));
    setErrors((prev) => ({ ...prev, avatar: "" }));
  };

  const handleTicketSelect = (type) => {
    setFormData((prev) => ({ ...prev, selectedTicketType: type }));
    setErrors((prev) => ({ ...prev, ticketType: "" }));
  };

  const validateStep = () => {
    let newErrors = {};
    
    if (step === 1) {
      if (!formData.selectedTicketType)
        newErrors.ticketType = "Please select a ticket type.";
      if (formData.ticketQuantity < 1)
        newErrors.quantity = "Please select a valid quantity.";
    }
    
    if (step === 2) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Name is required.";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format.";
      }
      if (!formData.avatarUrl)
        newErrors.avatar = "Avatar is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const getTicketPrice = (type) => {
    switch (type) {
      case 'REGULAR': return 0;
      case 'VIP': return 50;
      case 'VVIP': return 150;
      default: return 0;
    }
  };

  // Generate ticket details
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      onSubmitSuccess({
        ...formData,
        ticketPrice: getTicketPrice(formData.selectedTicketType)
      });
    }
  };

  // Reset form for a new ticket
  const handleBookAnother = () => {
    setFormData({
      fullName: "",
      email: "",
      avatarUrl: "",
      selectedTicketType: "",
      ticketQuantity: 1,
      aboutProject: ""
    });
    setStep(1);
    setErrors({});
    localStorage.removeItem("ticketData");
    localStorage.removeItem("ticketStep");
  };

  // Download ticket details as a text file
  const handleDownloadTicket = () => {
    const ticketInfo = `
      Name: ${formData.fullName}
      Email: ${formData.email}
      Ticket Type: ${formData.selectedTicketType}
      Quantity: ${formData.ticketQuantity}
      Total: $${getTicketPrice(formData.selectedTicketType) * formData.ticketQuantity}
      About: ${formData.aboutProject}
    `;
    const blob = new Blob([ticketInfo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ticket.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TicketHeader step={step} totalSteps={totalSteps} />
      
      <div id="ticket-container">
        {step === 1 && (
          <>
            <header>
              <h1>Techember Fest &#8221;25</h1>
              <p>
                Join us for an unforgettable experience at <br />
                [Event Name]! Secure your spot now.
              </p>
              <div>📍 [Event Location] | March 15, 2025 | 7:00 PM</div>
            </header>
            <hr />

            <div id="ticketType">
              <div className="text">Select Ticket Type:</div>
              <div id="tickets">
                {['REGULAR', 'VIP', 'VVIP'].map((type) => (
                  <div 
                    key={type}
                    className={`ticket ${formData.selectedTicketType === type ? 'selected' : ''}`}
                    onClick={() => handleTicketSelect(type)}
                  >
                    <div className="row">
                      <p className="type">{type} ACCESS</p>
                      <div className="charges">
                        {formData.selectedTicketType === type ? '✓' : `$${getTicketPrice(type)}`}
                      </div>
                    </div>
                    <div className="remaining">
                      {remainingTickets[type.toLowerCase()]} left
                    </div>
                  </div>
                ))}
              </div>
              {errors.ticketType && (
                <span className="error-message">{errors.ticketType}</span>
              )}
            </div>

            <div className="inputField">
              <label htmlFor="ticketQuantity" className="text">Number of Tickets</label>
              <select
                id="ticketQuantity"
                name="ticketQuantity"
                value={formData.ticketQuantity}
                onChange={handleInputChange}
                className="form-input"
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              {errors.quantity && (
                <span className="error-message">{errors.quantity}</span>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-group">
              <AvatarUpload
                onUploadSuccess={handleAvatarUpload}
                onError={(msg) => setErrors((prev) => ({ ...prev, avatar: msg }))}
                error={errors.avatar}
              />
              {errors.avatar && (
                <span className="error-message">{errors.avatar}</span>
              )}
            </div>

            <div className="inputField">
              <label htmlFor="fullName" className="text">Enter Your Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                aria-describedby="fullNameError"
                className="form-input"
              />
              {errors.fullName && (
                <span id="fullNameError" className="error-message">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="inputField">
              <label htmlFor="email">Enter Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                aria-describedby="emailError"
                className="form-input"
              />
              {errors.email && (
                <span id="emailError" className="error-message">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="inputField">
              <label htmlFor="aboutProject">About the Project</label>
              <textarea
                id="aboutProject"
                name="aboutProject"
                value={formData.aboutProject}
                onChange={handleInputChange}
                placeholder="Textarea"
                className="form-input"
                rows={6}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <div className="confirmation-wrapper">
            {/* <h2 className="confirmation-title">Ticket Confirmed!</h2> */}
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "100%" }}></div>
            </div>
            <div className="confirmation-card">
              <div className="user-avatar">
                {formData.avatarUrl ? (
                  <img 
                    src={formData.avatarUrl} 
                    alt="Avatar" 
                    className="confirmation-image" 
                  />
                ) : (
                  <div className="avatar-placeholder">No Image</div>
                )}
              </div>
              <div className="user-details">
                <table className="ticket-table">
                  <tbody>
                    <tr>
                      <th>Name:</th>
                      <td>{formData.fullName}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{formData.email}</td>
                    </tr>
                    <tr>
                      <th>Ticket Type:</th>
                      <td>{formData.selectedTicketType.toLowerCase()}</td>
                    </tr>
                    {/* <tr>
                      <th>Quantity:</th>
                      <td>{formData.ticketQuantity}</td>
                    </tr> */}
                    {formData.aboutProject && (
                      <tr>
                        <th>About Project:</th>
                        <td>{formData.aboutProject}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="form-navigation">
        {step === 1 && (
          <button
            type="button" 
            className="button primary"
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {step === 2 && (
          <>
            <button 
              type="button" 
              className="button secondary"
              onClick={handleBack}
            >
              Back
            </button>
            <button 
              type="submit" 
              className="button primary"
            >
              Generate Ticket
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <button 
              type="button" 
              className="button secondary"
              onClick={handleBookAnother}
            >
              Get New Ticket
            </button>
            <button 
              type="button" 
              className="button primary"
              onClick={handleDownloadTicket}
            >
              Download Ticket
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default TicketForm;
