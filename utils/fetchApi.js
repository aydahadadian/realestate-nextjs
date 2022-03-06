import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
        'x-rapidapi-host': 'bayut.p.rapidapi.com',
        'x-rapidapi-key': '508a5dfbd7msh6a00b581b9aa06ep1d3ceajsnb70de218662c'
    },
  });
    
  return data;
}