from fastapi import Depends
from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql.functions import now
from sqlalchemy.dialects.postgresql import ARRAY  # Import ARRAY for PostgreSQL
from app.database import Base
from typing import List
from .database import get_db
from sqlalchemy.orm import Session

class user(Base):
    __tablename__="users"
    u_id=Column(Integer,primary_key=True,nullable=False,index=True)
    email=Column(String,nullable=False,unique=True,index=True)
    password=Column(String,nullable=False)
    name=Column(String,nullable=False)
    post_list=Column(ARRAY(Integer), nullable=True)
    follow_list=Column(ARRAY(Integer), nullable=True)
    follower_list=Column(ARRAY(Integer), nullable=True)
    modify_at=Column(TIMESTAMP(timezone=True), nullable=False, server_default=now())
    role=Column(Integer,nullable=False,default=0)

    @staticmethod
    def add_follower(f_id: int, u_id: int, db: Session = Depends(get_db)):
        user_record = db.query(user).filter(user.u_id == u_id).first()
        if user_record:
            user_record.follower_list.append(f_id)
            db.commit()
            return "Follower added successfully"
        else:
            return "User not found"

    @staticmethod
    def fetch_following(id:int, db: Session = Depends(get_db)):
        alu = db.query(user).order_by(user.u_id).all()
        malu = []
        p = 0
        user_record = db.query(user).filter(user.u_id == id).first()
        khalu = user_record.follow_list
        
        for us in alu:
            if us.u_id == khalu[p]:
                malu.append(us)
                p += 1
        
        return malu
