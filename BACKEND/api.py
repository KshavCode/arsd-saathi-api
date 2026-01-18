from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from extract import ARSDApp
import uuid

# REQUIRE TOKEN FOR AUTHORIZATION IN FUTURE

class LoginRequest(BaseModel):
    name: str
    rollNo: str
    password: str

app = FastAPI(
    tags = ["FastAPI endpoints for ARSD app"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def require_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Login required")
    return authorization

@app.get("/")
def test():
    return {"message": "API is working!"}

@app.get("/api/login")
async def login(name:str, rollno:str, password:str):
    print("Login attempt for:", name, rollno)
    try:
        app_instance = ARSDApp(name, rollno, password, headless=True)
        success = app_instance.login()
        app_instance.driver.quit()
        if not success:
            return {"success": False, "message": "Invalid credentials"}
        return {"success": True, "token": str(uuid.uuid4()), "message": "Login successful"}

    except Exception as e:
        return {"success": False, "message": "Invalid credentials"}


@app.get("/api/get_attendance")
async def get_attendance(data: dict, token:str = Depends(require_token)):
    try:
        app_instance = ARSDApp(data["name"], data["rollNo"], data["password"], headless=True)
        report_found = app_instance.get_attendance()
        return {
            "success": True,
            "report_found": report_found,
            "message": "Attendance report found" if report_found else "Attendance report not found"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/api/get_faculty_details")
async def get_faculty_details(data: dict):
    
    try:
        app_instance = ARSDApp(data["name"], data["rollNo"], data["password"], headless=True)
        report_found = app_instance.get_faculty_details()
        
        return {
            "success": True,
            "data": report_found,
            
            "message": "Faculty details found"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
   


@app.get("/api/get_mentor_name")
async def get_mentor_name(data: dict):
    
    try:
        app_instance = ARSDApp(data["name"], data["rollNo"], data["password"], headless=True)
        mentorName = app_instance.get_mentor_name()
        
        return {
            "success": True,
            "mentor_name": mentorName,
            "message": "Mentor found"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/api/get_basic_details")
async def get_basic_details(data: dict):

    try:
        app_instance = ARSDApp(data["name"], data["rollNo"], data["password"], headless=True)
        basic_details =  app_instance.get_basic_details()
        
        return {
            "success": True,
            "data": basic_details,
            "message": "Basic details found"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
   

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)