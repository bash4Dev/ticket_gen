import { useState } from 'react'
import TicketForm from './components/TicketForm';
import Ticket from './components/Ticket';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  const [ticketData, setTicketData] = useState(null);

  const handleFormSubmit = (data) => {
    setTicketData(data);
  };

  return (
    <div className='App'>
      <Navbar />
      <div className='main'>
        {!ticketData && <TicketForm onSubmitSuccess={handleFormSubmit} />}
        {ticketData && <Ticket data={ticketData} />}
      </div>
    </div>
  );
}

export default App
