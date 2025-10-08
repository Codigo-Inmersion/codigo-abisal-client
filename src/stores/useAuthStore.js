/**
 * ZUSTAND STORE PARA AUTENTICACIÓN
 * 

 * 
 * Este store maneja:
 * - Estado del usuario actual
 * - Estado de autenticación
 * - Acciones: login, logout, checkAuth
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import authService from '../services/authService';

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        // ============================================
        // ESTADO
        // ============================================
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,

        // ============================================
        // ACCIONES
        // ============================================

        /**
         * Inicializar la autenticación al cargar la app
         * Verifica si hay un token válido guardado
         */
        initAuth: () => {
          set({ isLoading: true });
          
          if (authService.isAuthenticated()) {
            const user = authService.getCurrentUser();
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
          } else {
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false 
            });
          }
        },

        /**
         * Login - Autenticar usuario
         * @param {string} email 
         * @param {string} password 
         * @returns {Promise<{success: boolean, error?: string}>}
         */
        login: async (email, password) => {
          set({ isLoading: true, error: null });

          try {
            const { token } = await authService.login(email, password);
            authService.setToken(token);
            
            // Decodificar token para obtener info del usuario
            const decodedUser = authService.getCurrentUser();
            
            set({ 
              user: decodedUser, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            });

            return { success: true };
          } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Error al iniciar sesión';
            
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false,
              error: errorMessage
            });

            return { success: false, error: errorMessage };
          }
        },

        /**
         * Logout - Cerrar sesión
         */
        logout: () => {
          authService.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null 
          });
        },

        /**
         * Verificar si el usuario tiene un rol específico
         * @param {string} role 
         * @returns {boolean}
         */
        hasRole: (role) => {
          const { user } = get();
          return user?.role === role;
        },

        /**
         * Verificar si el usuario tiene alguno de los roles
         * @param {string[]} roles 
         * @returns {boolean}
         */
        hasAnyRole: (roles) => {
          const { user } = get();
          return roles.includes(user?.role);
        },

        /**
         * Limpiar error
         */
        clearError: () => {
          set({ error: null });
        },

        /**
         * Actualizar datos del usuario
         * Útil después de editar perfil
         * @param {object} userData 
         */
        updateUser: (userData) => {
          set((state) => ({
            user: { ...state.user, ...userData }
          }));
        }
      }),
      {
        name: 'auth-storage', // nombre en localStorage
        // Solo persistir user e isAuthenticated
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated
        })
      }
    ),
    { name: 'AuthStore' } // nombre para Redux DevTools
  )
);

export default useAuthStore;