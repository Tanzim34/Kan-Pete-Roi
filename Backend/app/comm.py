
from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql.functions import now
from sqlalchemy.dialects.postgresql import ARRAY  # Import ARRAY for PostgreSQL
from app.database import Base
class Comment(Base):
    __tablename__ ="cc"
    def __init__(self, tabel):
        self.__tablename__ = tabel

    id = Column(Integer, primary_key=True)
    body = Column(String, nullable=False)
    u_id = Column(String, nullable=False)

# Example usage:
# Create a comment instance with a specific table name
#comment_instance = Comment("custom_table_name")
