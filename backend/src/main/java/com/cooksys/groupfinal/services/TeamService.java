package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;

public interface TeamService {

	TeamDto createTeam(TeamRequestDto teamRequestDto);
}
