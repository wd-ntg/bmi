import React, { useState } from 'react';
import { INITIAL_EVENTS } from '../data';

const useCalendar = () => {
  const [currentEvents, setCurrentEvents] = useState(INITIAL_EVENTS);

  const updateCurrentEvents = (events) => {
    setCurrentEvents(events);
  };

  return {
    currentEvents,
    updateCurrentEvents,
  };
};

export default useCalendar;
