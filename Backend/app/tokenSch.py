from pydantic import BaseModel

class TokenBase(BaseModel):
    token: str
    u_id: int

class TokenCreate(TokenBase):
    pass

class Token(TokenBase):
    token_id: int

    class Config:
        orm_mode = True
