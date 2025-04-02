from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID

from app.models.league import League, LeagueCreate
from app.services.league_service import LeagueService

router = APIRouter(
    prefix="/leagues",
    tags=["leagues"],
)

@router.post("/", response_model=League, status_code=status.HTTP_201_CREATED)
async def create_league(
    league: LeagueCreate,
    league_service: LeagueService = Depends(),
    # user_id from auth token would be added here
):
    # For now, using a placeholder user_id
    user_id = "placeholder_user_id"
    return await league_service.create_league(league, user_id)

@router.get("/", response_model=List[League])
async def get_leagues(
    league_service: LeagueService = Depends(),
    # user_id from auth token would be added here
):
    # For now, using a placeholder user_id
    user_id = "placeholder_user_id"
    return await league_service.get_leagues_by_owner(user_id)

@router.get("/{league_id}", response_model=League)
async def get_league(
    league_id: UUID,
    league_service: LeagueService = Depends(),
    # user_id from auth token would be added here
):
    # For now, using a placeholder user_id
    user_id = "placeholder_user_id"
    league = await league_service.get_league(league_id)
    if not league:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="League not found"
        )
    if league.owner_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this league"
        )
    return league
