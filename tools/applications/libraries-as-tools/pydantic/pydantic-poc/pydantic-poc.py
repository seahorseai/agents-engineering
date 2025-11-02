from pydantic import BaseModel, EmailStr, field_validator


class UserRegistration(BaseModel):
    username: str
    email: EmailStr
    age: int

    @field_validator('username')
    @classmethod
    def username_must_be_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('Username must be alphanumeric')
        return v

    @field_validator('age')
    @classmethod
    def age_must_be_adult(cls, v):
        if v < 18:
            raise ValueError('You must be at least 18 years old to register')
        return v

# Valid data
try:
    user = UserRegistration(username="JohnDoe123", email="john@example.com", age=25)
    print("Valid user:", user)
except Exception as e:
    print("Validation error:", e)

# Invalid data
try:
    user = UserRegistration(username="John Doe!", email="john@", age=15)
except Exception as e:
    print("Validation error:", e)
