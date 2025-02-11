import axios from 'axios';
const baseUrl = 'http://localhost:3001/companies';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => {
    console.log('Get All Response:', response.data);
    return response.data;
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => {
    console.log('Create Response:', response.data);
    return response.data;
  });
};

const removePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => {
    console.log('Remove Person Response:', response.data);
    return response.data;
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => {
    console.log('Update Response:', response.data);
    return response.data;
  });
};

export default { getAll, create, removePerson, update };