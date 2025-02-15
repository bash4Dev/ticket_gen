import { useState } from 'react'
import TicketForm from './components/TicketForm';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  const [ setTicketData ] = useState(null);

  const handleFormSubmit = (data) => {
    setTicketData(data);
  };

  return (
    <div className='App'>
      <Navbar />
      <div className='main'>
        {<TicketForm onSubmitSuccess={handleFormSubmit} />}
      </div>
    </div>
  );
}

export default App