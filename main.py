from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from database import SessionLocal, engine
import models, schemas, auth

from auth import create_access_token, hash_password, verify_password, oauth2_scheme, decode_access_token

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Somnio AI Journaling API",
    description="An AI-powered journaling API with authentication.",
    version="1.0.0"
)




models.Base.metadata.create_all(bind=engine)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    user = db.query(models.User).filter(models.User.id == payload.get("sub")).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    
    return user

@app.get("/")
def read_root():
    return {"message": "Welcome to Somnio AI Journaling API"}

# **User Registration**
@app.post("/signup/", response_model=schemas.Token)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user_data.password)
    new_user = models.User(email=user_data.email, hashed_password=hashed_password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token({"sub": str(new_user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

# **User Login**
@app.post("/login/", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

# **Create a Journal Entry (Protected)**
@app.post("/journals/")
def create_journal(journal_data: schemas.JournalCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    journal_entry = models.JournalEntry(user_id=current_user.id, content=journal_data.content)

    db.add(journal_entry)
    db.commit()
    db.refresh(journal_entry)
    return journal_entry

# **Get All Journal Entries (Protected)**
@app.get("/journals/")
def get_journals(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == current_user.id).all()
