from typing import List
from pydantic import BaseModel, Field
from datetime import datetime

class user(BaseModel):
    email:str
    password:str
    name:str

class login_sch(BaseModel):
    email:str
    password:str

class retu_LogIn(BaseModel):
    email: str
    name: str
    u_id: int
    modify_at: datetime
    token:str

    class Config:
        orm_mode = True

class user_id_response(BaseModel):
    email:str
    name:str
    role:int
    u_id:int
    class Config:
        orm_mode = True

class sin(BaseModel):
    name:str
    class Config:
        orm_mode = True

class sin_2(BaseModel):
    name:str
    follwer:str
    class Config:
        orm_mode = True