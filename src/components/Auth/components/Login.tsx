//import '../../Control/assets/styles/login.css';
import '../assets/login.css'
import React, { useState } from 'react';
import { z } from 'zod';
import { encryptData } from '../../Middlewares/encryption';
import axiosInstance from '../../../Api/axiosConfig';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setUserIdOnly } from '../../../redux/userSlices';
import { useDispatch } from 'react-redux';
//Iconos del logeo
import userIcon from '../assets/img/user.svg';
import passwordIcon from '../assets/img/lock.svg';
// importamos la funcion para agregar los productos
import { handleAddToCartwithLogin } from '../../../controllers/cartController';

// Definir el esquema de validación usando Zod
const loginSchema = z.object({
    email: z.string().email("Por favor ingresa un correo electrónico válido").min(1, { message: "El correo electrónico es requerido" }),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type FormData = z.infer<typeof loginSchema>;

function Login() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const [formErrors] = useState<z.ZodIssue[] | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);

    // Se llama al dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Redirección
    const location = useLocation(); // Para acceder a la ubicación antes del login



    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        try {
            // Cifrar los datos
            const encryptedEmail = await encryptData(formData.email);
            const encryptedPassword = await encryptData(formData.password);

            if (!encryptedEmail || !encryptedPassword) {
                throw new Error('Error de cifrado: Username o Password no definidos');
            }

            // Enviar los datos como un objeto
            const response = await axiosInstance.post('/user/loginUsuario', {
                dataSegura: {
                    email: encryptedEmail,
                    password: encryptedPassword,
                },
            });

            const result = response.data;
            if (result && result.token && result.userId) {
                // Supone que 'token' y 'userId' son las claves en la respuesta del backend
                localStorage.setItem('authToken', result.token); // Guardar el token en localStorage
                localStorage.setItem('userId', result.userId); // Guardar el id del usuario en localStorage
                dispatch(setUserIdOnly(result.userId)); // Despachar el ID del usuario al store de Redux
                setLoginSuccess(true);
                // se va obtener los productos del localstorage para insertar en la BD
                const cartStorage = localStorage.getItem('carrito');
                if (cartStorage) {
                    const idUsuario = localStorage.getItem('userId') ?? '';
                    const productos = JSON.parse(cartStorage);
                    console.log(productos);
                    for (const item of productos) {
                    await handleAddToCartwithLogin(parseInt(idUsuario), item.idProducto, item.cantidad);
                    }
                    // Limpiar localStorage
                    localStorage.removeItem("carrito");
                }
                // Redirigir a la ruta almacenada en el estado, o al inicio si no hay ruta previa
                const redirectTo = (location.state as any)?.from || '/';
                navigate(redirectTo);
            } else {
                setServerError("La contraseña o usuario son incorrectos");
                setLoginSuccess(false);
            }

        } catch (error) {
            console.error('Error en el proceso de inicio de sesión:', error);
            setServerError("Error al iniciar sesión. Inténtalo más tarde.");
            setLoginSuccess(false);
        }
    };


    return (
        <form className='FormLogin' onSubmit={(event) => event.preventDefault()}>
            <div className='ContentFormLogin'>
                <div className='titleLogin'>
                    <h1>Iniciar sesión</h1>
                </div>
                <div className='emailLogin'>
                    <label htmlFor='email'></label>
                    <div className='inputIcon'>
                        <img src={userIcon} alt='User Icon' className='iconUser' />
                        <input
                            type='text'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Correo electronico'
                        />
                    </div>
                    {formErrors?.find((issue) => issue.path[0] === 'email') && (
                        <span className='error'>
                            {formErrors.find((issue) => issue.path[0] === 'email')?.message}
                        </span>
                    )}
                </div>
                <div className='passwordLogin'>
                    <label htmlFor='password'></label>
                    <div className='inputIcon'>
                        <img src={passwordIcon} alt='Pass Icon' className='iconPassword' />
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Contraseña'
                        />
                    </div>
                    {formErrors?.find((issue) => issue.path[0] === 'password') && (
                        <span className='error'>
                            {formErrors.find((issue) => issue.path[0] === 'password')?.message}
                        </span>
                    )}
                </div>
                {serverError && <span className="error">{serverError}</span>}
                {loginSuccess && <span className="success">Inicio de sesión exitoso</span>}
                <div className='buttonActionLogin'>
                    <button id='send-info-user' className='button_Send' type='button' onClick={handleLogin}>
                        Enviar
                    </button>
                </div>
                <div className="no-account-login">
                    <p className='account'>Aun no tienes una cuenta? <Link className="signup-link" to="/SignUp">Crea una cuenta aqui</Link></p>
                </div>
            </div>
        </form>
    );
}

export default Login;