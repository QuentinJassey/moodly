// authService.js
import api from './config';

export const register = async (userData) => {
  return await api.post('/auth/local/register', userData);
};

export const login = async (userData) => {
  return await api.post('/auth/local', userData);
};

export const forgotPassword = async (email) => {
  return await api.post('/auth/forgot-password', { email });
};

export const resetPassword = async (code, password, passwordConfirmation) => {
  return await api.post('/auth/reset-password', { code, password, passwordConfirmation });
};

export const changePassword = async (currentPassword, newPassword) => {
  // Vous devrez peut-être ajuster cette fonction en fonction de votre API Strapi
  return await api.post('/auth/change-password', { currentPassword, newPassword });
};
