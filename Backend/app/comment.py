from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql.functions import now
from sqlalchemy.dialects.postgresql import ARRAY  # Import ARRAY for PostgreSQL
from app.database import Base
from .database import engine
import re

class comment(Base):

        __tablename__= "namm"
        id=Column(Integer,primary_key=True)
        body = Column(String, nullable=False)
        u_id = Column(Integer, nullable=False)

        def __init__(self,table):
                self.__tablename__=table
