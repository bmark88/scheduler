import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function updateData() {
   return Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      
      if (data.type === SET_INTERVIEW) {
        return updateData()
      }
    };

      updateData()
      return () => webSocket.close();
  }, []);
  
  const setDay = day => {dispatch({ type: SET_DAY, day})};

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
    currentDay.spots = remainingSpots(state.day, state.days, appointments);

    const newDays = {
      ...state.days,
      ...currentDay.spots
    };

    return axios.put(`api/appointments/${id}`, {interview})
      .then(() => dispatch({ type: SET_INTERVIEW, appointments, newDays}));
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
    currentDay.spots = remainingSpots(state.day, state.days, appointments);
    
    const newDays = {
      ...state.days,
      ...currentDay.spots
    };
    
    return axios.delete(`api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, appointments, newDays}));
  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
};