from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from app.api.routes import admin, admin_management, health, orders
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(title="SANAD API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(admin_management.router, prefix="/api")


@app.exception_handler(ValidationError)
async def validation_exception_handler(_: Request, exc: ValidationError):
    return JSONResponse(
        status_code=422,
        content={"error": {"code": "VALIDATION_ERROR", "message": str(exc)}},
    )
