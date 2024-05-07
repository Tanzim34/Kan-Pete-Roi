from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql.functions import now
from sqlalchemy.dialects.postgresql import ARRAY  # Import ARRAY for PostgreSQL
from app.database import Base

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, nullable=False, index=True)
    title = Column(String, nullable=False)
    body = Column(String, nullable=False)
    post_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=now())
    u_id = Column(Integer, nullable=False)  # Assuming u_id is a user id
    comments = Column(ARRAY(Integer), nullable=True)  # Use ARRAY for PostgreSQL
    genre=Column(String,nullable=False,index=True)
    

