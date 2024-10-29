import { Form, Link } from "@remix-run/react";
import Button from "~/components/Button";
import { ButtonState } from "~/utilities/enums";
import { RiCameraLensLine } from "react-icons/ri";
import { useState } from "react";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    return (
        <div className="min-h-dvh center-full">
            <main className="min-h-dvh center-full py-[80px] w-90-auto max-w-[400px] md:border-[1px] md:border-gray-low md:px-[40px] md:max-w-[480px] md:rounded-2xl md:min-h-[700px]">
                <div className="text-4xl font-bold mb-6 flex space-x-3">
                    <RiCameraLensLine />
                <h1>Instaflare</h1> 
                </div>
                <p className="text-lg w-[180px] text-center mb-12"><span className="text-sky-pearl">Comparte</span> tu mundo y <span className="text-sky-blue">descubre</span> otros.</p>

                <Form
                    className="w-full space-y-10 mb-6"
                >
                    <label  className="flex flex-col space-y-3">
                        <span className="text-sm font-medium">Nombre de usuario</span>
                        <input
                            className="text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full"
                            aria-label="Correo electrónico"
                            name="username"
                            type="text"
                            value={username}
                            onChange={v => setUsername(v.target.value)} 
                        />
                    </label>

                    <label  className="flex flex-col space-y-3">
                        <span className="text-sm font-medium">Correo electrónico</span>
                        <input
                            className="text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full"
                            aria-label="Correo electrónico"
                            name="email"
                            type="email"
                            value={email}
                            onChange={v => setEmail(v.target.value)} 
                        />
                    </label>

                    <label className="flex flex-col space-y-3">
                        <span className="text-sm font-medium">Contraseña</span>
                        <input
                            className="text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full"
                            aria-label="contraseña"
                            name="pass"
                            type="password" 
                            value={pass}
                            onChange={v => setPass(v.target.value)}
                        />
                    </label>

                    <label className="flex flex-col space-y-3">
                        <span className="text-sm font-medium">Confirmar contraseña</span>
                        <input
                            className="text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full"
                            aria-label="contraseña"
                            name="pass"
                            type="password" 
                            value={pass2}
                            onChange={v => setPass2(v.target.value)}
                        />
                    </label>

                    <Button
                        state={ email.length > 0 && pass.length > 5 ? ButtonState.Active : ButtonState.Inactive}
                    >
                        Registrarse
                    </Button>
                </Form>
                <p>¿Ya tienes cuenta? <Link to="/login" className="font-medium transition-colors text-sky-base hover:text-sky-hover active:text-sky-active">Inicia sesión</Link></p>
            </main>
        </div>
    );
}