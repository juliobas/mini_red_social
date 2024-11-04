import { Form, Link } from "@remix-run/react";
import Button from "~/components/Button";
import { ButtonState } from "~/utilities/enums";
import { RiCameraLensLine } from "react-icons/ri";
import { useState } from "react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = Object.fromEntries(await request.formData());

    const body = {
            "id": 0,
            "name": form.name,
            "email": form.email,
            "password": form.pass,
            "avatar": ""
        }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {

        const response = await fetch("https://mini-red-social.onrender.com/api/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        });
    
        if (!response.ok) {
            return ""
        }

        return redirect("/login?signup=ok");

    } catch (e) {
        console.log("error", e)
    }

    // if (response.ok) {
    //     const data = await response.json();
    //     const token = data.data;

    //     headers.append("Authorization", `Bearer ${token}`)
    //     const userResponse = await fetch("http://localhost:8000/api/user/my_profile", {
    //         method: "GET",
    //         headers: headers,
    //     });

    //     // console.log(userResponse.)
    //     const dat = await userResponse.json();

    //     const user = {
    //         id: dat.data.id,
    //         name: dat.data.name,
    //         email: dat.data.email,
    //         avatar: dat.data.avatar,
    //         token: token,
    //     };
    //     console.log(user)

    //     const authCookieHeader = await authCookie.serialize(user);

    //     return redirect("/", {
    //         headers: {
    //           "Set-Cookie": authCookieHeader,
    //         },
    //       });
    // }

    // const data: ErrorResponse = await response.json();
    // return data.message;
    return ""
};

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');

    const [passError, setPassError] = useState('');
    const [pass2Error, setPass2Error] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const checkPass = (pass: string) => {
        const passregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passregex.test(pass)) {
            setPassError('Debe incluir al menos 6 carácteres, letras y numeros');
        } else {
            setPassError('');
        }
    };
    const checkPass2 = (pass2: string) => {
        if (pass2 !== pass) {
            setPass2Error('Las contraseñas no coinciden');
        } else {
            setPass2Error('');
        }
    };
    const checkEmail = (email: string) => {
        const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailregex.test(email)) {
            setEmailError('Correo no válido');
        } else {
            setEmailError('');
        }
    };
    const checkUsername = (username: string) => {
        setUsername(username.trim());
        if (username.trim().length < 1) {
            setUsernameError('El nombre no puede estar vacio');
        } else {
            setUsernameError('');
        }
    };
    const buttonState = () => {
        return (
            username.length > 0 &&
            email.length > 0 &&
            pass.length > 5 &&
            pass2.length > 5 &&
            !(usernameError || emailError || passError || pass2Error)
        );
    };

    return (
        <div className="min-h-dvh center-full">
            <main className="min-h-dvh center-full py-[80px] w-90-auto max-w-[400px] md:border-[1px] md:border-gray-low md:px-[40px] md:max-w-[480px] md:rounded-2xl md:min-h-[700px]">
                <div className="text-4xl font-bold mb-6 flex space-x-3">
                    <RiCameraLensLine />
                <h1>Instaflare</h1> 
                </div>
                <p className="text-lg w-[180px] text-center mb-12"><span className="text-sky-pearl">Comparte</span> tu mundo y <span className="text-sky-blue">descubre</span> otros.</p>

                <Form method="POST"
                    className="w-full space-y-10 mb-6"
                >
                    <label  className="relative flex flex-col space-y-3">
                        <span className="text-sm font-medium">Nombre de usuario</span>
                        <input
                            className={`${usernameError && 'border-red'} text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full`}
                            aria-label="Correo electrónico"
                            name="name"
                            type="text"
                            value={username}
                            onChange={v => setUsername(v.target.value)}
                            onBlur={v => checkUsername(v.target.value)}
                        />
                        {
                            usernameError &&
                            <span className="absolute bottom-[-25px] text-xs text-red">{usernameError}</span>
                        }
                    </label>

                    <label  className="relative flex flex-col space-y-3">
                        <span className="text-sm font-medium">Correo electrónico</span>
                        <input
                            className={`${emailError && 'border-red'} text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full`}
                            aria-label="Correo electrónico"
                            name="email"
                            type="email"
                            value={email}
                            onChange={v => setEmail(v.target.value)}
                            onBlur={v => checkEmail(v.target.value)}
                        />
                        {
                            emailError &&
                            <span className="absolute bottom-[-25px] text-xs text-red">{emailError}</span>
                        }
                    </label>

                    <label className="relative flex flex-col space-y-3">
                        <span className="text-sm font-medium mb-3">Contraseña</span>
                        <input
                            className={`${passError && 'border-red'} text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full`}
                            aria-label="contraseña"
                            name="pass"
                            type="password" 
                            value={pass}
                            onChange={v => setPass(v.target.value)}
                            onBlur={v => checkPass(v.target.value)}
                        />
                        {
                            passError &&
                            <span className="absolute bottom-[-25px] text-xs text-red">{passError}</span>
                        }
                    </label>

                    <label className="relative flex flex-col space-y-3">
                        <span className="text-sm font-medium">Confirmar contraseña</span>
                        <input
                            className={`${pass2Error && 'border-red'} text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full`}
                            aria-label="contraseña"
                            name="pass"
                            type="password" 
                            value={pass2}
                            onChange={v => {
                                setPass2(v.target.value);
                                checkPass2(v.target.value);
                            }}
                        />
                        {
                            pass2Error &&
                            <span className="absolute bottom-[-25px] text-xs text-red">{pass2Error}</span>
                        }
                    </label>

                    <Button // Revisar estado del boton en base a errores tambien
                        state={ buttonState() ? ButtonState.Active : ButtonState.Inactive}
                    >
                        Registrarse
                    </Button>
                </Form>
                <p>¿Ya tienes cuenta? <Link to="/login" className="font-medium transition-colors text-sky-base hover:text-sky-hover active:text-sky-active">Inicia sesión</Link></p>
            </main>
        </div>
    );
}