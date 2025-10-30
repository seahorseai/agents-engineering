from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, EmailStr
from typing import Optional

app = FastAPI()

# ✅ Define a Pydantic model for request validation
class User(BaseModel):
    id: Optional[int] = Field(None, example=1)
    name: str = Field(..., min_length=2, max_length=50, example="Alice")
    email: EmailStr = Field(..., example="alice@example.com")
    age: Optional[int] = Field(None, ge=0, le=120, example=30)

# ✅ Fake in-memory database
users_db = []

# ✅ POST endpoint to create a user
@app.post("/users/", response_model=User)
def create_user(user: User):
    # Simulate ID assignment
    user.id = len(users_db) + 1
    users_db.append(user)
    return user

# ✅ GET endpoint to fetch all users
@app.get("/users/", response_model=list[User])
def list_users():
    return users_db

# ✅ GET endpoint to fetch a single user by ID
@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int):
    for user in users_db:
        if user.id == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")
