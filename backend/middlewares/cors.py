from main import app 
from fastapi.middleware.cors import CORSMiddleware

origins= [
    'https://instaflare.onrender.com/'
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)