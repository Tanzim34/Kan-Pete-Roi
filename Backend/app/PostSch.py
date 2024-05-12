from pydantic import BaseModel

from typing import Optional

class post(BaseModel):
    title: str
    body: str
    u_id: int
    genre:str
    photo:Optional[bytes]
    def alu(i,j,k):
        print("mutu koro")

class afterCreate(BaseModel):
    title: str
    body: str
    id: int
    photo:Optional[bytes]
    class Config:
        orm_mode = True
    
class numi(BaseModel):
    title:str
    body:str
    id:int
    user_name:str
    u_id:int
    modify_at:str
    photo:Optional[bytes]
    class Config:
        orm_mode = True

class ph(BaseModel):
    photo:Optional[bytes]
    p_id:int