// authService.js
import api from './config';

export const register = async (userData) => {
  return await api.post('/auth/local/register', userData);
};

export const login = async (userData) => {
  try {
    // Faire la demande de connexion à Strapi
    const response = await api.post('/auth/local', userData);

    // Supposons que la réponse inclut un objet 'user' avec un champ 'role'
    const { jwt, user } = response.data;

    // Stocker le JWT pour une utilisation ultérieure dans les requêtes authentifiées
    localStorage.setItem('jwt', jwt);

    // Stocker le rôle de l'utilisateur
    localStorage.setItem('role', user.role);

    // Retourner l'utilisateur et le JWT pour une utilisation ultérieure dans l'application
    return { user, jwt };
  } catch (error) {
    // Gérer l'erreur de connexion
    throw error;
  }
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
