from fastapi import Depends, HTTPException, status
from typing import List, Optional
from uuid import UUID
import asyncio

from app.models.league import League, LeagueCreate

# This is a mock service for development purposes
# In a real implementation, this would connect to a database
class LeagueService:
    def __init__(self):
        # In-memory storage for development
        self.leagues = {}
    
    async def create_league(self, league_data: LeagueCreate, owner_id: str) -> League:
        league = League(
            **league_data.dict(),
            owner_id=owner_id
        )
        self.leagues[league.id] = league
        return league
    
    async def get_league(self, league_id: UUID) -> Optional[League]:
        return self.leagues.get(league_id)
    
    async def get_leagues_by_owner(self, owner_id: str) -> List[League]:
        return [league for league in self.leagues.values() if league.owner_id == owner_id]
    
    async def update_league(self, league_id: UUID, league_data: LeagueCreate, owner_id: str) -> Optional[League]:
        existing_league = await self.get_league(league_id)
        if not existing_league:
            return None
        
        if existing_league.owner_id != owner_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this league"
            )
        
        updated_league = League(
            **league_data.dict(),
            id=existing_league.id,
            owner_id=owner_id,
            created_at=existing_league.created_at
        )
        
        self.leagues[league_id] = updated_league
        return updated_league
    
    async def delete_league(self, league_id: UUID, owner_id: str) -> bool:
        existing_league = await self.get_league(league_id)
        if not existing_league:
            return False
        
        if existing_league.owner_id != owner_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this league"
            )
        
        del self.leagues[league_id]
        return True
    
    async def sync_league(self, league_id: UUID, owner_id: str) -> Optional[League]:
        # This would connect to EA servers in a real implementation
        # For now, just simulate a delay and update the last_sync timestamp
        existing_league = await self.get_league(league_id)
        if not existing_league:
            return None
        
        if existing_league.owner_id != owner_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to sync this league"
            )
        
        # Simulate EA server sync delay
        await asyncio.sleep(1)
        
        # Update last_sync timestamp
        from datetime import datetime
        existing_league.last_sync = datetime.utcnow()
        existing_league.updated_at = datetime.utcnow()
        
        return existing_league
