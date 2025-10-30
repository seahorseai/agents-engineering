from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Example FastAPI App", version="1.0.0")

class Item(BaseModel):
    name: str
    price: float

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI"}

@app.post("/items/")
def create_item(item: Item):
    return {"item": item, "status": "created"}