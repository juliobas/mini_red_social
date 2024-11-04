import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { authCookie } from "~/utilities/utils";
import { useLoaderData, Form, useSubmit, useActionData, redirect } from "@remix-run/react";
import { useState } from "react";
import CSS from "csstype";
import Button from "~/components/Button";
import { ButtonState } from "~/utilities/enums";

export const action = async ({ request }: ActionFunctionArgs ) => {
    const formData = await request.formData();
    const formType = formData.get("formType");

    if (formType === 'image') {
        return imageAction(formData);
    } else {
        return confirmAction(formData, request);
    }
};

const imageAction = async (form: FormData) => {
    const imageFile = form.get('image');

    if (!imageFile || !(imageFile instanceof File)) {
        return json( {ok: false, message: "error al cargar imagen", url:""});
    }

    const blob = new Blob([await imageFile.arrayBuffer()], { type: imageFile.type });

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'postimage');
    const url = `https://api.cloudinary.com/v1_1/dlsdxj3sm/image/upload`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        const { secure_url } = await response.json();
        return json( {ok: true, message: "", url: secure_url});
    } catch (error) {
        console.error("Error al subir imagen", error);
    }

    return json( {ok: false, message: "error al cargar imagen", url:""});
};

const confirmAction = async (form: FormData, request: Request) => {
    const cookieHeader = request.headers.get("Cookie");
    const { token, name } = await authCookie.parse(cookieHeader);

    if (!token) {
        throw new Response("Unauthorized", { status: 401 });
    }


    // BODY - IMAGE
    const formEntries = Object.fromEntries(form);
    console.log(formEntries)

    // const body = Object.fromEntries();
    const body = {
        "name": name,
        "password": '',
        "avatar": formEntries.image,
    };
    console.log("body", body)
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`)

    const response = await fetch("https://mini-red-social.onrender.com/api/user/update", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: headers,
    });

    if (response.ok) {
        console.log("avatar updated", await response.json());
        return redirect("/");
    }

    console.log("hubo algun error")
    return json( {ok: false, message: "error al cargar imagen", url:""});
}

export const loader = async ({ request }: LoaderFunctionArgs ) => {
    const cookieHeader = request.headers.get("Cookie");
    const { name } = await authCookie.parse(cookieHeader);

    return { name };
};

export default function Avatar() {
    const { name }: { name: string} = useLoaderData();
    const [isLoading, setIsLoading] = useState(false);
    const imageUrl = useActionData<typeof action>();
    const submit = useSubmit();

    if (imageUrl && isLoading) {
        setIsLoading(false);
    }

    const avatarimage: CSS.Properties = {
        backgroundImage: `url(${imageUrl?.url})`,
    };

    return(
        <div className="min-h-dvh center-full">
            <main className="min-h-dvh center-full py-[80px] w-90-auto max-w-[400px] md:border-[1px] md:border-gray-low md:px-[40px] md:max-w-[480px] md:rounded-2xl md:min-h-[700px]">
                <h1 className="text-2xl text-center mb-10">¡Bienvenido <span className="font-bold text-sky-base">{name}</span>!</h1>
                <p className="mb-3 w-full text-sm">Sube tu imagen de perfil</p>
                <Form method="post" encType="multipart/form-data"
                    className="mb-4 w-full"
                >
                    <input type="hidden" name="formType" value="image" />
                    <label  className="flex flex-col space-y-3 relative"
                    >
                        <input
                            className={`flex flex-col justify-center text-sm cursor-pointer`}
                            aria-label="Imagen"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={e => {
                                setIsLoading(true);
                                submit(e.currentTarget.form);
                            }}
                        />
                    </label>
                </Form>
                {isLoading && <p className="text-xs text-center mb-1">Cargando imagen...</p>}
                <div 
                className={`w-5/12 bg-gray-base aspect-square rounded-full bg-cover bg-center`}
                    style={avatarimage}
                >
                </div>
                <Form method="post" className="space-y-4 w-full mt-7">
                    <input type="hidden" name="formType" value="post" />
                    <input type="hidden" name="image" value={imageUrl?.url} />
                    <Button
                        state={ imageUrl?.url ? ButtonState.Active : ButtonState.Inactive }
                    >Confirmar</Button>
                </Form>
            </main>
        </div>
    )
}