import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definimos la interfaz del estado del usuario
export interface UserState {
  idUsuario: string;
  username: string;
  email: string;
  address: string;
  phonenumber: string;
  profileImage: string | null;
}

// Estado inicial
const initialState: UserState = {
  idUsuario: '',
  address: '',
  email: '',
  username: '',
  phonenumber: '',
  profileImage: localStorage.getItem('profileImage') || null, // Leer la imagen del perfil desde localStorage
};

// Definimos el slice de usuario
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserIdOnly: (state, action: PayloadAction<string>) => {
      state.idUsuario = action.payload;  // Solo actualiza el idUsuario
    },

    setUserId: (state, action: PayloadAction<UserState>) => {
      // Actualiza el estado con los datos completos del usuario
      state.idUsuario = action.payload.idUsuario;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.phonenumber = action.payload.phonenumber;
      state.profileImage = action.payload.profileImage;
      
      // Guardar en localStorage solo si profileImage tiene un valor válido
      if (action.payload.profileImage) {
        localStorage.setItem('profileImage', action.payload.profileImage);  // Cambié de imageUrl a profileImage
      }
    },

    logout: (state) => {
      // Restaura el estado a su valor inicial
      Object.assign(state, initialState);
      // Limpiar localStorage al cerrar sesión
      localStorage.removeItem('profileImage');  // Eliminar imagen de perfil al hacer logout
    },
  },
});

export const { setUserIdOnly, setUserId, logout } = userSlice.actions;

export default userSlice.reducer;
