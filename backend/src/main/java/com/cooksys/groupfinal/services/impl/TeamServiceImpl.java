package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.TeamService;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.TeamMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
	
	private final TeamRepository teamRepository;
	private final UserRepository userRepository;
	private final CompanyRepository companyRepository;
	private final TeamMapper teamMapper;

	@Override
	public TeamDto createTeam(TeamRequestDto teamRequestDto) {
		Company company = companyRepository.findById(teamRequestDto.getCompanyId()).orElseThrow(() -> new NotFoundException("Company not found"));
		
		Team team = new Team();
        team.setName(teamRequestDto.getName());
        team.setDescription(teamRequestDto.getDescription());
        team.setCompany(company);
        
        Set<User> users = new HashSet<>();
        for (Long userId : teamRequestDto.getUserIds()) {
            User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
            users.add(user);
        }
        team.setTeammates(users);
        
        team = teamRepository.save(team);
        for (User user : users) {
            user.getTeams().add(team);
            userRepository.save(user);
        }

        return teamMapper.entityToDto(team);
	}

}
