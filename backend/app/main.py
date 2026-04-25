from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.health import router as health_router
from app.routes.score import router as score_router
from app.routes.rewrite import router as rewrite_router
from app.routes.score_policy import router as score_policy_router
from app.routes.rewrite_optimize import router as rewrite_optimize_router

app = FastAPI(title="PolicyPulse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(score_router)
app.include_router(rewrite_router)
app.include_router(score_policy_router)
app.include_router(rewrite_optimize_router)