import { Form, Link, redirect, useActionData } from "@remix-run/react";
import Button from "~/components/Button";
import { ButtonState, LoginError } from "~/utilities/enums";
import { ErrorResponse } from "~/utilities/types";
import { RiCameraLensLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    const body = Object.fromEntries(await request.formData());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
    });
    if (response.ok) {
        return redirect("/")
    }

    const data: ErrorResponse = await response.json();
    console.log(data.message)

    return data.message;
};

export default function Login () {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [buttonState, setButtonState] = useState(ButtonState.Inactive);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const message = useActionData<typeof action>();
    console.log(message)

    useEffect(() => {
        if (email.length > 0 && pass.length > 5) {
            setButtonState(ButtonState.Active);
        } else {
            setButtonState(ButtonState.Inactive);
        }
    }, [email, pass]);

    useEffect(() => {
        switch(message) {
            case LoginError.NotFoundEmail: setEmailErrorMessage("Email incorrecto");
            break;
            case LoginError.IncorrectPassword: setPasswordErrorMessage("Contraseña incorrecta");
            break;
            default: setEmailErrorMessage('');
        }
        if (message === LoginError.NotFoundEmail) {
            setEmailErrorMessage("Email incorrecto")
        }
    }, [message])

    return (
        <div className="min-h-dvh center-full">
            <main className="min-h-dvh center-full py-[80px] w-90-auto max-w-[400px] md:border-[1px] md:border-gray-low md:px-[40px] md:max-w-[480px] md:rounded-2xl md:min-h-[700px]">
                <div className="text-4xl font-bold mb-6 flex space-x-3">
                    <RiCameraLensLine />
                <h1>Instaflare</h1> 
                </div>
                <p className="text-lg w-[180px] text-center mb-12"><span className="text-sky-pearl">Comparte</span> tu mundo y <span className="text-sky-blue">descubre</span> otros.</p>

                <Form
                    method="post"
                    className="w-full space-y-10 mb-6"
                >
                    <label  className="flex flex-col space-y-3 relative">
                        <span className="text-sm font-medium">Correo electrónico</span>
                        <input
                            className="text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full"
                            aria-label="Correo electrónico"
                            name="email"
                            type="email"
                            value={email}
                            onChange={v => setEmail(v.target.value)} 
                        />
                        {
                            emailErrorMessage &&
                            <span className="absolute bottom-[-25px] text-xs">{emailErrorMessage}</span>
                        }
                        
                    </label>

                    <label className="flex flex-col space-y-3 relative">
                        <span className="text-sm font-medium">Contraseña</span>
                        <input
                            className="text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full"
                            aria-label="contraseña"
                            name="password"
                            type="password" 
                            value={pass}
                            onChange={v => setPass(v.target.value)}
                        />
                        {
                            passwordErrorMessage &&
                            <span className="absolute bottom-[-25px] text-xs">{passwordErrorMessage}</span>
                        }
                    </label>

                    <Button
                        state={buttonState}
                    >
                        Iniciar sesion
                    </Button>
                </Form>
                <p>¿No tienes cuenta? <Link to="/signup" className="font-medium transition-colors text-sky-base hover:text-sky-hover active:text-sky-active">Registrate</Link></p>
            </main>
        </div>
    );
}