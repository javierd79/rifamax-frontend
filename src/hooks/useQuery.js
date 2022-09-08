import axios from 'axios';

export const useQueryPost = async (link, query, subIndex, body) => {
  const response = await axios.post(`${link}${query}${subIndex}`, body);
  const data = await response.data;
    return data;
}; // C

export const useQueryGet = async (link, query, subIndex) => {
  const response = await axios.get(`${link}${query}${subIndex}`);
  const data = await response.data;
    return data;
}; // R

export const useQueryPut = async (link, query, subIndex, body) => {
  const response = await axios.put(`${link}${query}${subIndex}`, body);
  const data = await response.data;
    return data;
}; // U

export const useQueryDelete = async (link, query, subIndex) => {
  const response = await axios.delete(`${link}${query}${subIndex}`);
  const data = await response.data;
    return data;
}; // D