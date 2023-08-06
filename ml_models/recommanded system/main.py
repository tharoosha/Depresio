from fastapi.responses import HTMLResponse, JSONResponse
import mood_TO_video
import youtube_search
import break_time_suggest
import video_to_mood
from pydantic import BaseModel
from fastapi import FastAPI

app = FastAPI()


@app.get("/youtube_videos", response_class=HTMLResponse)
def predict_model1(mood: str):
    vidoe_types = mood_TO_video.train_and_predict_video_types(mood)
    result = youtube_search.search_youtube_videos(vidoe_types)
    return JSONResponse(content=result)


@app.get("/brek_time", response_class=HTMLResponse)
def predict_model1(work_time: float):
    result = break_time_suggest.predict_break_time(work_time)
    return JSONResponse(content=result)


@app.get("/mood_from_video", response_class=HTMLResponse)
def predict_model1(link: str):
    result = video_to_mood.video_to_mood(link)
    return JSONResponse(content=result)
