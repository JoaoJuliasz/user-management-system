export const getUserInformationFromStorage = () => {
  const token = localStorage.getItem("user_token");
  const userId = localStorage.getItem("user_id");
  return {
    token,
    userId,
  };
};
