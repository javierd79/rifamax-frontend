import axios from 'axios';

export const useTokenQueryPost = async (link, query, hasToken, body, subIndex) => {
  const response = await axios.post(`${link}${query}${subIndex}`, body, {
    headers: {
      Authorization: `Bearer ${hasToken}`,
    },
  });
  const data = await response.data;
    return data;
}; // C

export const useTokenQueryGet = async (link, query, hasToken, subIndex) => {
  const response = await axios.get(`${link}${query}${subIndex}`, {
    headers: {
      Authorization: `Bearer ${hasToken}`,
    },
  });
  const data = await response.data;
    return data;
}; // R

export const useTokenQueryPut = async (link, query, hasToken, body, subIndex) => {
  const response = await axios.put(`${link}${query}${subIndex}`, body, {
    headers: {
      Authorization: `Bearer ${hasToken}`,
    },
  });
  const data = await response.data;
    return data;
}; // U

export const useTokenQueryDelete = async (link, query, hasToken, subIndex) => {
  const response = await axios.delete(`${link}${query}${subIndex}`, {
    headers: {
      Authorization: `Bearer ${hasToken}`,
    },
  });
  const data = await response.data;
    return data;
}; // D