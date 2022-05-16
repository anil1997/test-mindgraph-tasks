import { API_URL } from '../config'
import axios from 'react-native-axios';

export const CALL_API = (url, body, method) => {
  
  const headers = {
    'Content-Type': 'application/json',
  };

  return axios
    .get(url, { headers })
    .then((response) => response )
    .catch((error) => error );
};
