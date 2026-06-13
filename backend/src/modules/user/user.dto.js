
export const userResponse = (user) => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

export const usersResponse = (users) => {
  return users.map(userResponse);
};