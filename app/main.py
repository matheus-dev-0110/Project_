from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="PulseSphere")

app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
templates.env.globals["now"] = datetime.now


@app.get("/", response_class=HTMLResponse)
async def read_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/vision", response_class=HTMLResponse)
async def read_vision(request: Request):
    return templates.TemplateResponse("vision.html", {"request": request})


@app.get("/api/pulse")
async def pulse_data():
    return {
        "active_users": 4823,
        "uptime": "99.992%",
        "next_event": {
            "name": "Quantum Experience Summit",
            "location": "São Paulo",
            "date": "2024-09-18",
        },
        "live_trends": [
            {"title": "AI-Driven Urban Planning", "momentum": 92},
            {"title": "Neuroadaptive Interfaces", "momentum": 87},
            {"title": "Circular BioEconomy", "momentum": 81},
        ],
    }
