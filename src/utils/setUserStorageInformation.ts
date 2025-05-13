export const setUserStorageInformation = (token: string, id: number) => {
  localStorage.setItem("user_token", JSON.stringify(token));
  localStorage.setItem("user_id", JSON.stringify(id));
};
