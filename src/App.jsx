import { createContext, useState } from 'react'

import './App.css'
import Form from './components/Form/Form';
import Calendar from './components/Calendar/Calendar';
import moment from 'jalali-moment'
import DatePicker from './components/DatePicker/DatePicker';

export const CoreContext = createContext();

function App() {
  const [items, setItems] = useState(["hosein", "fatemeh", "amir", "tara"]);
  const selectedDay = moment().add(5, "month");

  function handleClick() {
    setItems(prev => {
      return [...prev, "pouya"];
    })
  }
  return (
    <>
      <CoreContext.Provider value={items}>
        {/* <NavBar />
      <List items={items} />
      <button onClick={handleClick}>add to list</button> */}
        {/* <Form />       */}
        <div className="container mt-4">
          <DatePicker />
        </div>
      </CoreContext.Provider>
    </>
  )
}

export default App
