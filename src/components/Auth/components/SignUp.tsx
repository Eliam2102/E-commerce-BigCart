import '../assets/signUp.css'

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import axiosInstance from '../../../Api/axiosConfig';
import { encryptData } from '../../Middlewares/encryption';
import { Link, useNavigate} from 'react-router-dom';
// Definir el esquema de validación usando Zod
const SignUpSchema = z.object({
  username: z.string().min(1, { message: "El nombre es requerido" }),
  lastname: z.string().min(1, { message: 'El apellido es requerido' }),
  age: z.union([z.string().min(1, { message: 'Ingrese su edad' }), z.number().min(0, { message: 'La edad no puede ser negativa' }).max(120, { message: 'La edad no puede ser mayor de 120' })]), // Permitir cadena vacía o número
  email: z.string().min(8, { message: 'El email es requerido' }),
  phonenumber: z.string().regex(/^\+?\d{10,15}$/, "Número de teléfono no válido"),
  address: z.string().min(10, { message: 'La dirección es obligatoria' }),
  password: z.string().min(6, { message: 'El minimo de cacteres son 6' }),
  confirmPassword: z.string().min(6, { message: 'La contraseña no coincide' }),  // Nueva propiedad
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], 
});

export type FormData = z.infer<typeof SignUpSchema> & {
    age: string | number; // Permitir tanto número como cadena para evitar conflictos
};

function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        lastname: '',
        age: '' ,
        email: '',
        phonenumber: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [signupSuccess, setSignupSuccess] = useState<boolean | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        //Realiza una evaluación del input Age para verificar si es number
        setFormData({ ...formData, [name]: name === 'age' ? (value === "" ? "" : Number(value)): value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = SignUpSchema.safeParse(formData);

        if (!result.success) {
            setFormErrors(result.error.issues);
        } else {
            setFormErrors(null);
            try {
                // Cifrar los datos sensibles (password y username)
                const encryptedUsername = await encryptData(formData.username);
                const encryptedLastname = await encryptData(formData.lastname);
                //El campo de Edad se convierte en string para poder cifrarlo
                const encrypytedAge = await encryptData(formData.age.toString());
                const encrypytedEmail = await encryptData(formData.email);
                const encrypytedPhonenumber = await encryptData(formData.phonenumber);
                const encrypytedAddress = await encryptData(formData.address);
                const encryptedPassword = await encryptData(formData.password);
                
                // Enviar los datos como un objeto
                const response = await axiosInstance.post('/user/SignUpUsuario', {
                    dataSegura: {
                    username: encryptedUsername,
                    lastname: encryptedLastname,
                    age: encrypytedAge,
                    email: encrypytedEmail,
                    phonenumber: encrypytedPhonenumber,
                    address: encrypytedAddress,
                    password: encryptedPassword,
                },
            });
                console.log('Respuesta del servidor:', response.data);
                setSignupSuccess(true);
                setServerError(null);
            } catch (error) {
                console.error("Error al registrar:", error);
                setServerError("Error al registrar. Inténtalo de nuevo.");
                setSignupSuccess(false);
            }
        }
    };

    // Redirigir automáticamente después de un registro exitoso
    useEffect(() => {
    if (signupSuccess) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirigir después de 2 segundos
      return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }
    }, [signupSuccess, navigate]);


    return (
        <form className='FormSignUp' onSubmit={handleSubmit}>
            <div className='ContentFormSignUp'>
                <div className='titleSignUp'>
                    <h1>Crear una cuenta</h1>
                </div>
                {/* Nombre */}
                <div className='name'>
                    <label htmlFor='username'></label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Primer nombre'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'username') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'username')?.message}</span>
                    )}
                </div>
                {/* Apellido */}
                <div className='lastname'>
                    <label htmlFor='lastname'></label>
                    <input
                        type='text'
                        id='lastname'
                        name='lastname'
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder='Primer apellido'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'lastname') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'lastname')?.message}</span>
                    )}
                </div>
                {/* Edad */}
                <div className='age'>
                    <label htmlFor='age'></label>
                    <input
                        type='number'
                        id='age'
                        name='age'
                        value={formData.age}
                        onChange={handleChange}
                        placeholder='Edad'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'age') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'age')?.message}</span>
                    )}
                </div>
                {/* Gmail */}
                <div className='emailSignUp'>
                    <label htmlFor='email'></label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Correo electronico'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'email') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'email')?.message}</span>
                    )}
                </div>
                {/* Teléfono */}
                <div className='phonenumber'>
                    <label htmlFor='phonenumber'></label>
                    <input
                        type='text'
                        id='phonenumber'
                        name='phonenumber'
                        value={formData.phonenumber}
                        onChange={handleChange}
                        placeholder='Telefono'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'phonenumber') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'phonenumber')?.message}</span>
                    )}
                </div>
                {/* Dirección */}
                <div className='address'>
                    <label htmlFor='address'></label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        placeholder='Dirección'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'address') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'address')?.message}</span>
                    )}
                </div>
                {/* Contraseña */}
                <div className='passwordSignUp'>
                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Contraseña'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'password') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'password')?.message}</span>
                    )}
                </div>
                {/* Confirmar Contraseña */}
                <div className='confirmPassword'>
                    <label htmlFor='confirmPassword'></label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder='Confirmar Contraseña'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'confirmPassword') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'confirmPassword')?.message}</span>
                    )}
                </div>                
                {serverError && <span className="error">{serverError}</span>}
                {signupSuccess &&
                 <span className="success">Registro exitoso</span>

                }
                {/* Botones de acción */}
                <div className='buttonAction'>
                    <button className='button-send' type='submit'> Enviar
                    </button>
                </div>
                <div className="no-account-SignUp">
                    <p>Ya tiene una cuenta? <Link className='linkSignUp' to="/login">Inicia sesión aqui</Link></p>
                </div>
                </div>
        </form>
    );
}

export default SignUp;
