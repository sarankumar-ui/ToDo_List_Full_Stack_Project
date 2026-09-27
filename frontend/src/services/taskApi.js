

import API from "./api";


export const getAllTasks  = async () => {
  const response = await API.get("/task/alltasks");
  return response.data;
}


export const createTask = async (taskData) => {
  const response = await API.post("/task/createnewtask", taskData);
  return response.data;
};


export const updateTask = async (id, taskData) => {
  const response = await API.put(`/task/updatetask/${id}`, taskData);
  return response.data;
};


export const updateTaskStatus = async (id, status) => {
  const response = await API.patch(`/task/updatetaskstatus/${id}`, { status });
  return response.data;
};


export const deleteTask = async (id) => {
  const response = await API.delete(`/task/deletetask/${id}`);
  return response.data;
};


export const searchTasks = async (query = '', status = 'All', priority = 'All') => {
  const response = await API.get('/task/search', {
    params: {
      q: query,
      status: status,
      priority: priority,
    }
  });
  return response.data;
};
