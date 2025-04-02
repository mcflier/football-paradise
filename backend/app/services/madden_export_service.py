from fastapi import Depends
from typing import List, Dict, Any, Optional
import json
import os
from datetime import datetime

from app.models.madden_export import MaddenExport

class MaddenExportService:
    def __init__(self):
        # In-memory storage for development
        self.exports = {}
        
        # Create exports directory if it doesn't exist
        os.makedirs("exports", exist_ok=True)
    
    async def save_export(self, league_id: str, export_type: str, data: Dict[str, Any]) -> MaddenExport:
        """
        Save exported data from Madden Companion App
        """
        export = MaddenExport(
            league_id=league_id,
            export_type=export_type,
            data=data
        )
        
        # Store in memory
        if league_id not in self.exports:
            self.exports[league_id] = {}
        
        if export_type not in self.exports[league_id]:
            self.exports[league_id][export_type] = []
            
        self.exports[league_id][export_type].append(export)
        
        # Also save to file for persistence
        export_dir = f"exports/{league_id}"
        os.makedirs(export_dir, exist_ok=True)
        
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        filename = f"{export_dir}/{export_type}_{timestamp}.json"
        
        with open(filename, "w") as f:
            json.dump({
                "id": str(export.id),
                "league_id": export.league_id,
                "export_type": export.export_type,
                "created_at": export.created_at.isoformat(),
                "data": export.data
            }, f, indent=2)
        
        return export
    
    async def get_latest_export(self, league_id: str, export_type: str) -> Optional[MaddenExport]:
        """
        Get the latest export of a specific type for a league
        """
        if league_id not in self.exports or export_type not in self.exports[league_id]:
            return None
        
        # Sort by created_at and return the latest
        return sorted(self.exports[league_id][export_type], key=lambda x: x.created_at, reverse=True)[0]
    
    async def get_all_exports(self, league_id: str) -> Dict[str, List[MaddenExport]]:
        """
        Get all exports for a league
        """
        if league_id not in self.exports:
            return {}
        
        return self.exports[league_id]
