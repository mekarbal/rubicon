export const BASE_URL = "http://localhost:4000/api/v1";
export const REQUEST_URL = {
  PROJECTS: `${BASE_URL}/projects`,
  TASKS: `${BASE_URL}/tasks`,
};

//function to convert date to dd/mm/yyyy
export const formatDate = (dateString) => {
  const inputDate = new Date(dateString);
  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1;
  const year = inputDate.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
//function return YYYY-MM-DD
export const formatDateString = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
