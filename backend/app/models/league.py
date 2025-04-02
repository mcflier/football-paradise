from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID, uuid4

class LeagueBase(BaseModel):
    name: str
    logo_url: Optional[str] = None
    ea_email: Optional[str] = None
    ea_password: Optional[str] = None
    
class LeagueCreate(LeagueBase):
    pass

class League(LeagueBase):
    id: UUID = Field(default_factory=uuid4)
    owner_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_sync: Optional[datetime] = None
    
    class Config:
        orm_mode = True
