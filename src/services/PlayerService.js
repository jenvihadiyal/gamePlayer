import http from "../http-common";

const getAll = () => {
  return http.get("/PlayerContactDetails");
};

const get = id => {
  return http.get(`/PlayerContactDetails/${id}`);
};

const create = data => {
  return http.post("/PlayerContactDetails", data);
};

const update = (id, data) => {
  return http.put(`/PlayerContactDetails/${id}`, data);
};

const remove = id => {
  return http.delete(`/PlayerContactDetails/${id}`);
};



export default {
  getAll,
  get,
  create,
  update,
  remove
};
