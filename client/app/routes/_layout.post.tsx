import { Form, useSubmit, useActionData, redirect } from "@remix-run/react";
import Button from "~/components/Button";
import { ButtonState } from "~/utilities/enums";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useState } from "react";
import { authCookie } from "~/utilities/utils";
import { customAlphabet } from 'nanoid'

export const action = async  ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formType = formData.get("formType");

    if (formType === 'image') {
        return imageAction(formData);
    } else {
        return postAction(formData, request);
    }
};

const imageAction = async (form: FormData) => {
    const imageFile = form.get('image');
    const body = Object.fromEntries(form);
    // console.log(body.image)

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

const postAction = async (form: FormData, request: Request) => {
    const cookieHeader = request.headers.get("Cookie");
    const { token, id } = await authCookie.parse(cookieHeader);
    console.log(token)

    if (!token) {
        throw new Response("Unauthorized", { status: 401 });
    }

    // ID
    const nanoid = customAlphabet('1234567890', 10)

    // BODY - IMAGE
    const formEntries = Object.fromEntries(form);
    console.log(formEntries)

    // POST_DATE
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear().toString();
    const premonth = (currentDate.getMonth() + 1).toString();
    const month = premonth.length === 1 ? "0"+premonth : premonth;
    const preday = currentDate.getDate().toString();
    const day = preday.length === 1 ? "0"+preday : preday;

    // const body = Object.fromEntries();
    const body = {
        "id": Number(nanoid()),
        "body": formEntries.body,
        "image": formEntries.image,
        "post_date": `${year}-${month}-${day}`,
        "user_id": id
    };
    // console.log("body", body)
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`)

    const response = await fetch("http://localhost:8000/api/post/createPost", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
    });

    if (response.ok) {
        console.log("new post created", await response.json());
        return redirect("/");
    }

    console.log("error when creating new post", response)
    return json( {ok: false, message: "error al cargar imagen", url:""});
}

export default function CreatePost() {
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const submit = useSubmit();
    const imageUrl = useActionData<typeof action>();

    if (imageUrl && isLoading) {
        setIsLoading(false);
    }

    return(
        <main className="w-90-auto pt-8 space-y-4">
            <h1 className="text-center text-sm font-bold">Nueva publicación</h1>
            <Form method="post" encType="multipart/form-data"
                className=""
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
            {isLoading && <p className="text-xs text-center">Cargando imagen...</p>}
            <div className={`w-full bg-gray-base ${imageUrl?.ok ? '' : 'aspect-video'}`}>
                <img 
                    className={`w-full`}
                    src={imageUrl?.url} alt="" 
                />
            </div>
            
            <Form method="post" className="space-y-4">
                <input type="hidden" name="formType" value="post" />
                <input type="hidden" name="image" value={imageUrl?.url} />
                <label  className="flex flex-col space-y-3 relative">
                    <span className="text-sm font-medium">Agrega una descripción</span>
                    <input
                        className={`text-sm bg-black111 border-[1px] border-gray-low rounded-full h-[40px] px-6 outline-none transition-colors focus:border-white-full`}
                        aria-label="Correo electrónico"
                        name="body"
                        type="text"
                        value={body}
                        onChange={v => setBody(v.target.value)} 
                    />                        
                </label>
                <Button
                    state={ imageUrl?.url && body ? ButtonState.Active : ButtonState.Inactive }
                >Publicar</Button>
            </Form>
        </main>
    );
}