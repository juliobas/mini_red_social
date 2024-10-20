from fastapi import FastAPI

#Routes
from routers.auth import auth_router

app = FastAPI()
app.title = "Mini Red Social"
app.version = "0.0.1"

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(auth_router, prefix="/api/auth")