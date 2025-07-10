import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../../redux/userSlices';
import axiosInstance from '../../../Api/axiosConfig';
import '../assets/UserProfile.css';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const baseURL = 'http://localhost:3000';

interface UserState {
  idUsuario: string;
  username: string;
  email: string;
  address: string;
  phonenumber: string;
  perfilImage: string | null;
}

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken');
  const user = useSelector((state: { user: UserState }) => state.user);
  
  const [perfilImage, setPerfilImage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    address: '',
    email: '',
    username: '',
    phonenumber: '',
    profileImage: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('info');
  const [snackbarTitle, setSnackbarTitle] = useState('');

  useEffect(() => {
    if (token) {
      axiosInstance.get('/user/obtenerDatosUsuario')
        .then((response) => {
          const data = response.data;
          const relativeImageUrl = data.perfilImagen;
          const imageUrl = relativeImageUrl ? `${baseURL}${relativeImageUrl}` : null;
  
          dispatch(setUserId({
            idUsuario: data.idUsuario,
            username: data.nombreUsuario,
            email: data.email,
            address: data.direccion,
            phonenumber: data.telefono,
            profileImage: imageUrl,
          }));

          setUserData({
            address: data.direccion || '',
            email: data.email || '',
            username: data.nombreUsuario || '',
            phonenumber: data.telefono || '',
            profileImage: data.perfilImagen || '',
          });
  
          if (imageUrl) {
            localStorage.setItem('profileImage', imageUrl);
          }
          
          setPerfilImage(imageUrl);  
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
  }, [token, dispatch]);

  useEffect(()=> {
    //leer la url de la imagen del perfil al cargar el componente.
    const storedPerfilImage = localStorage.getItem('profileImage');
    if (storedPerfilImage) {
      setPerfilImage(storedPerfilImage);
    }
    }, []);

    useEffect(()=> {
    }, [perfilImage]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setPerfilImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('perfilImage') as HTMLInputElement;

    if (fileInput?.files?.[0]) {
      formData.append('profileImage', fileInput.files[0]);
    }

    if (userData.username !== user.username) {
      formData.append('username', userData.username);
    }

    if (userData.email !== user.email) {
      formData.append('email', userData.email);
    }

    if (userData.address !== user.address) {
      formData.append('address', userData.address);
    }

    if (userData.phonenumber !== user.phonenumber) {
      formData.append('phonenumber', userData.phonenumber);
    }

    const hasChanges = Array.from(formData.entries()).length > 0;
    if (!hasChanges) {
      setSnackbarMessage('No se han realizado cambios.');
      setSnackbarSeverity('info');
      setSnackbarTitle('Sin cambios');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/user/updateDataUser/${user.idUsuario}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = response.data.profileImage ? `${baseURL}${response.data.profileImage}` : perfilImage;
      dispatch(setUserId({
        ...user,
        username: userData.username,
        email: userData.email,
        address: userData.address,
        phonenumber: userData.phonenumber,
        profileImage: imageUrl,
      }));

      if (imageUrl) {
        localStorage.setItem('profileImage', imageUrl);
      }

      setPerfilImage(imageUrl);
      setSnackbarMessage('Datos guardados correctamente.');
      setSnackbarSeverity('success');
      setSnackbarTitle('¡Éxito!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      setSnackbarMessage('Hubo un error al guardar los datos. Por favor, inténtalo nuevamente.');
      setSnackbarSeverity('error');
      setSnackbarTitle('Error');
      setSnackbarOpen(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="user-profile">
      <div className="image-container">
        <h2>Mi Perfil</h2>
        <div className="profile-image-container">
          <label htmlFor="perfilImage" className="profile-image-label">
            <img
              src={perfilImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-image"
            />
          </label>
          <input
            type="file"
            id="perfilImage"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <form className="user-info-form" onSubmit={handleSave}>
        <h4>Usuario</h4>
        <input
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          value={userData.username || ''}
          onChange={handleInputChange}
          id="user-profile-info"
        />
        <h4>Correo electronico</h4>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={userData.email || ''}
          onChange={handleInputChange}
          id="user-profile-info"
        />
        <h4>Número telefonico</h4>
        <input
          type="text"
          name="phonenumber"
          placeholder="Teléfono"
          value={userData.phonenumber || ''}
          onChange={handleInputChange}
          id="user-profile-info"
        />
        <h4>Dirección</h4>
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={userData.address || ''}
          onChange={handleInputChange}
          id="user-profile-info"
        />
        <div className="buttons-container">
          <button type="submit" className="save-button">Guardar</button>
          <button type="button" className="cancel-button" onClick={() => window.location.href = '/'}>Cancelar</button>
        </div>
      </form>

      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          <AlertTitle>{snackbarTitle}</AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProfile;