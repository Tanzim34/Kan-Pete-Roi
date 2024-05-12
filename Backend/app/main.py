from fastapi import Depends, FastAPI, HTTPException,File, UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import tables,user
from . import user
from typing import List
from .database import engine, get_db
from . import PostSch,userSch
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from . import auth
from fastapi.middleware.cors import CORSMiddleware
from . import tokentable
from . import tokenSch
from . import comment
from . import img
from .database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP,Table, desc, select,insert
from fastapi.encoders import jsonable_encoder
import base64
import sqlalchemy
from . import commmsh
import psycopg2
from psycopg2.extras import RealDictCursor
tables.Base.metadata.create_all(bind=engine)
user.Base.metadata.create_all(bind=engine)
tokentable.Base.metadata.create_all(bind=engine)
img.Base.metadata.create_all(bind=engine)



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

try:
    conn=psycopg2.connect(host='localhost',database='news',user='postgres',password='amishawngaliboy420',cursor_factory=RealDictCursor)
    cur=conn.cursor()

except Exception as error:
    print("error:",error)


@app.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}
# Dependency to get the database session

@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts/{genre}")
def get_posts(genre,db: Session = Depends(get_db)):
    
    if genre=="all":
        posts=db.query(tables.Post).order_by(desc(tables.Post.post_at)).all()
    else:
        posts=db.query(tables.Post).filter(tables.Post.genre==genre).order_by(desc(tables.Post.post_at)).all()
    # print("all")
    
    p=[]
    if not posts:
        return p
    print("all")
    for item in posts:
        photo1 = db.query(img.Imge).filter(img.Imge.p_id == item.id).first()
        if photo1:
            photo_bytes = photo1.photo
        else:
            photo_bytes = None
        a1 = PostSch.afterCreate(title=item.title, body=item.body, id=item.id, photo=photo_bytes)
        p.append(a1)

    return p
    
@app.get("/posts/u_id/{u_id}")
def get_posts(u_id:int,db: Session = Depends(get_db)):
    
    posts=db.query(tables.Post).filter(tables.Post.u_id==u_id).order_by(desc(tables.Post.post_at)).all()
    p=[]
    if not posts:
        return p
    print("all")
    for item in posts:
        photo1 = db.query(img.Imge).filter(img.Imge.p_id == item.id).first()
        if photo1:
            photo_bytes = photo1.photo
        else:
            photo_bytes = None
        a1 = PostSch.afterCreate(title=item.title, body=item.body, id=item.id, photo=photo_bytes)
        p.append(a1)

    return p
    
@app.get("/alu/{id}")
def get_post(id: int, db: Session = Depends(get_db)):
    post = db.query(tables.Post).filter(tables.Post.id == id).first()
    photo_byte=None
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    

    
    use=db.query(user.user).filter(user.user.u_id==post.u_id).first()

    photo1=db.query(img.Imge).filter(img.Imge.p_id==post.id).first()

    if  photo1:
        photo_byte=photo1.photo

    new_pos=PostSch.numi(title=post.title,body=post.body,user_name=use.name,id=post.id,u_id=use.u_id,photo=photo_byte)
    
    return new_pos

import base64

@app.post("/createpost")
def create_post(post: PostSch.post, db: Session = Depends(get_db)):
    data = {
        "title": post.title,
        "body": post.body,
        "u_id": post.u_id,
        "genre": post.genre
    }

    new_post = tables.Post(**data)
    db.add(new_post)
    db.commit()
    post_id = int(new_post.id)
    if isinstance(post.photo, bytes):
        new_ph1 = PostSch.ph(photo=post.photo,p_id=post_id)
        new_post_photo = img.Imge(photo=post.photo,p_id=post_id)
        db.add(new_post_photo)
        db.commit()
    alll=str(post_id)
    table_name = "comment" + alll

    class comment(Base):
        __tablename__ = table_name
        id = Column(Integer, primary_key=True)
        body = Column(String, nullable=False)
        u_id = Column(String, nullable=False)
        u_name=Column(String,nullable=False)

    Base.metadata.create_all(bind=engine)
    return new_post

@app.post("/Create_user",response_model=userSch.retu_LogIn)
def create_user(user_10: userSch.user, db: Session = Depends(get_db)):
    
        print('alu')
        user_data = user_10.dict()
        new_row = user.user(**user_data)
        auth_instance = auth.Auth()
        token = auth_instance.create_token(user_10.email, user_10.password)

        print(token)
        db.add(new_row)
        #db.add(token_data)
        db.commit()
        db.refresh(new_row)
        #db.refresh(token_data)
        alu12=db.query(user.user).filter(user.user.email==user_10.email).first()
        new_uid=alu12.u_id
        new_token=tokenSch.TokenBase(token=token,u_id=new_uid)
        new_tok=new_token.dict()
        new_token_row=tokentable.token(**new_tok)
        db.add(new_token_row)
        db.commit()
        db.refresh(new_token_row)
        p=userSch.retu_LogIn(email=alu12.email,name=alu12.name,u_id=alu12.u_id,modify_at=alu12.modify_at,token=token)
        return p

@app.post('/LogIn', response_model=userSch.retu_LogIn)
def retu_user(ele: userSch.login_sch, db: Session = Depends(get_db)):
    
    auth_obj = auth.Auth()
    alu1 ,token = auth_obj.login(ele.email, ele.password)
    if not alu1 or alu1 == "Wrong":
        raise HTTPException(status_code=404, detail="User Not Found or Incorrect Password")
    elif alu1 == "User Doesn't Exist":
        raise HTTPException(status_code=404, detail="User Doesn't Exist")
    else:
        
        data=userSch.retu_LogIn(email=alu1.email,token=token,name=alu1.name,u_id=alu1.u_id,modify_at=alu1.modify_at)
        
        return data

@app.get("/getuser/{token}")
def retur_user(token,db: Session = Depends(get_db)):
    
    print(token)
    # Use the token value in the filter
    new_id = db.query(tokentable.token).filter(tokentable.token.token == token).first()

    print(new_id.u_id)

    if not new_id:
         raise HTTPException(status_code=404, detail="User Not Found or Incorrect Password")
    alu=db.query(user.user).filter(user.user.u_id==new_id.u_id).first()
    if not alu:
         raise HTTPException(status_code=404, detail="User Not Found or Incorrect Password")
    alu1=userSch.user_id_response(email=alu.email,name=alu.name,role=alu.role)
    return alu1


@app.get("/user_1/{id}", response_model=userSch.sin)
def get_user(id: int, db: Session = Depends(get_db)):
    user_instance = db.query(user.user).filter(user.user.u_id == id).first()

    if not user_instance:
        raise HTTPException(status_code=404, detail="User not found")

    return user_instance

@app.get("/posts/id/{id}",response_model=List[PostSch.afterCreate])
def get_user_post(id:int,db: Session = Depends(get_db)):
    user_post=db.query(tables.Post).filter(tables.Post.u_id==id).all()
    if not user_post :
        raise HTTPException(status_code=404, detail="User not found")
    return user_post

@app.get("/user_2/{id}/{use}")
def get_user(id:int,use:int,db: Session = Depends(get_db)):
    use1=db.query(user.user).filter(user.user.u_id==id).first()
    alu=False
    is_foll="follow"
    if use1.follower_list:
        follower=use1.follower_list
        for l in follower:
            if l==use:
                alu=True
                is_foll="Following"
                break
    
    
    alu1=userSch.sin_2(name=use1.name,follwer=is_foll)

    return alu1

@app.post("/add_follower/{id}/{use}")
def add_follower(id: int, use: int, db: Session = Depends(get_db)):
    # Retrieve the user to follow
    qqq=db.query(user.user).filter(user.user.u_id == id)
    user_to_follow = db.query(user.user).filter(user.user.u_id == id).first()
    
    if not user_to_follow:
        raise HTTPException(status_code=404, detail="User not found")
    qqqq=db.query(user.user).filter(user.user.u_id == use)
    follower_user = db.query(user.user).filter(user.user.u_id == use).first()
    
    if not follower_user:
        raise HTTPException(status_code=404, detail="Follower user not found")
    
    if user_to_follow.follower_list:
        foll=user_to_follow.follower_list
        print(foll)
        foll.append(use)
        print(foll)
        user_to_follow.follower_list=foll

        qqq.update({"follower_list":foll})
    else:
        user_to_follow.follower_list = [use]

    if follower_user.follow_list:
        foll=follower_user.follow_list
        print(foll)
        foll.append(id)
        print(foll)
        follower_user.follow_list=foll

        qqqq.update({"follow_list":foll})
    else:
        follower_user.follow_list = [id]
    
    db.commit()
    
    return "ok"




@app.get("/comment/{id}",response_model=List[commmsh.com_re])
def get_comment(id:str,db: Session = Depends(get_db)):
    name="comment"+id
    metadata = Base.metadata
    metadata.reflect(engine)
    comment_table = metadata.tables.get(name)
    result=None
    if comment_table is None:
        print(f"No comment table found for post 14")
        return {"nothing"}
    
    else:
        query = select(comment_table.c.id,comment_table.c.body,comment_table.c.u_id,comment_table.c.u_name)
        with engine.connect() as conn:
            result = conn.execute(query)
            comments_for_post_14 = result.fetchall()
            return comments_for_post_14



@app.post("/alu/{id}/comment")
def up_comment(id: str,input:commmsh.CommentInput):
    name="comment"+id
    print(input.comm)
    print(input.u_id)
    cur.execute("INSERT INTO {} (body, u_id,u_name) VALUES (%s, %s, %s)".format(name), (input.comm, input.u_id,input.u_name))
    conn.commit()
    cur.execute("SELECT * FROM {}".format(name))
    posts=cur.fetchall()
    return posts

@app.delete("/logout/{token}")
def delete_log(token: str, db: Session = Depends(get_db)):
    db.query(tokentable.token).filter(tokentable.token.token == token).delete()
    db.commit()
    return 'ok'