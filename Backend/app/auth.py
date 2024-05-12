
from datetime import datetime
from fastapi import Depends, HTTPException
from app.dumy import hash_password
from . import user,tokenSch,tokentable
from .database import get_db
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

class Auth:
    token:str = None # Define token as a class-level variable
    
    def create_token(email: str, password: str):
        combined = email + password
        current_time = datetime.now().isoformat()
        combined=combined+current_time
        Auth.token = hash_password(combined)  # Assign the token to the class-level variable
        return Auth.token  # Return the generated token
    
    def match(self, db: Session = Depends(get_db)):
        if not self.token:
            return "No token available"
        
        user_record = db.query(user.user).filter(user.user.token == Auth.token).first()
        
        if not user_record:
            return "error"
        
        return user_record
    
    def login(self,email:str,password:str):
        db: Session = next(get_db())
        alu=db.query(user.user).filter(user.user.email==email).first()
        if not alu:
            return "User Doesn't Exist"
        
        token=Auth.create_token(email=email,password=password)
        new_uid=alu.u_id
        new_token=tokenSch.TokenBase(token=token,u_id=new_uid)
        new_tok=new_token.dict()
        new_token_row=tokentable.token(**new_tok)
        db.add(new_token_row)
        db.commit()
        db.refresh(new_token_row)
        
        return alu,token
    
    
        
