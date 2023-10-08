from fastapi.responses import HTMLResponse, JSONResponse
import mood_TO_video
import youtube_search
import break_time_suggest
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:/58000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserFeedbackUpdate(BaseModel):
    mood: str
    video_type: str
    user_feedback: int


@app.get("/youtube_videos", response_class=HTMLResponse)
def predict_model1(mood: str):
    video_types = mood_TO_video.train_and_predict_video_types(mood)
    result = youtube_search.search_youtube_videos(video_types)
    return JSONResponse(content=result)


@app.get("/break_time", response_class=HTMLResponse)
def predict_model2(work_time: float):
    result = break_time_suggest.predict_break_time(work_time)
    return JSONResponse(content=result)


@app.post("/update_user_feedback", response_class=JSONResponse)
def update_user_feedback(feedback: UserFeedbackUpdate):
    mood_TO_video.update_user_feedback(
        feedback.mood, feedback.video_type, feedback.user_feedback
    )
    return {"message": "User feedback updated successfully"}


# Entry point to run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
