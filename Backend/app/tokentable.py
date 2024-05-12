from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql.functions import now
from sqlalchemy.dialects.postgresql import ARRAY  # Import ARRAY for PostgreSQL
from app.database import Base

class token(Base):
    __tablename__="token"
    token_id=Column(Integer,primary_key=True,nullable=False)
    token=Column(String,unique=True,index=True,nullable=False)
    u_id=Column(Integer,nullable=False)
