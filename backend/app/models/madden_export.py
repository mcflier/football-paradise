from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID, uuid4

class MaddenExportBase(BaseModel):
    league_id: str
    export_type: str
    data: Dict[str, Any]
    
class MaddenExport(MaddenExportBase):
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        orm_mode = True
