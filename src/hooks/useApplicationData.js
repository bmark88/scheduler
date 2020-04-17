import { useState, useEffect} from "react";
import axios from "../../node_modules/axios";

export default function useApplicationData() {
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('api/days')),
      Promise.resolve(axios.get('api/appointments')),
      Promise.resolve(axios.get('api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  },[]);

  const [state, setState] = useState({
    day: [],
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    console.log(id, interview)

    return axios.put(`api/appointments/${id}`, {interview})
      .then(res => setState({...state, appointments}));
  };


  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then(res => setState({...state, appointments}));
  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
};