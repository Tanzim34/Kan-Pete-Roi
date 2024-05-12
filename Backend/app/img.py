from sqlalchemy import Column, Integer,LargeBinary
from app.database import Base

class Imge(Base):
    __tablename__="chobi"
    id=Column(Integer,primary_key=True,index=True)
    photo=Column(LargeBinary)
    p_id=Column(Integer,nullable=False)
