
from pydantic import BaseModel


class CommentInput(BaseModel):
    comm: str
    u_id: str
    u_name:str


class com_re(BaseModel):
    id:int
    body:str
    u_id:str
    u_name:str
    class Config:
        orm_mode = True
