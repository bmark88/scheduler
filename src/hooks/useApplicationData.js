import { useState, useEffect} from "react";
import axios from "../../node_modules/axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('api/days')),
      Promise.resolve(axios.get('api/appointments')),
      Promise.resolve(axios.get('api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  },[]);
  
  const setDay = day => setState(prev => ({ ...prev, day }));

  function getCurrentDay(dayName, allDays) {
    return Object.values(allDays).filter(day => day.name === dayName)[0];
  };

  function remainingSpots(dayName, allDays, allAppointments) {
    const currentDay = getCurrentDay(dayName, allDays);
    const maxApptID = currentDay.id * 5;
    const minApptID = maxApptID - 4;
    const spotsRemaining = Object.values(allAppointments)
    .filter(
      appointment => appointment.id >= minApptID 
      && appointment.id <= maxApptID 
      && appointment.interview === null
      ).length;

    return spotsRemaining;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const currentDay = getCurrentDay(state.day, state.days);
    currentDay.spots = remainingSpots(state.day, state.days, appointments)

    const newDays = {
      ...state.days,
      ...currentDay.spots
    };

    return axios.put(`api/appointments/${id}`, {interview})
      .then(() => setState(prev => ({...prev, appointments, newDays})));
  };

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const currentDay = getCurrentDay(state.day, state.days);
    currentDay.spots = remainingSpots(state.day, state.days, appointments)
    
    const newDays = {
      ...state.days,
      ...currentDay.spots
    };
    
    return axios.delete(`api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, appointments, newDays})));
  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
};