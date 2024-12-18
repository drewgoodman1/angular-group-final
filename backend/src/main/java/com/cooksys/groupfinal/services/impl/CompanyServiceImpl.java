package com.cooksys.groupfinal.services.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;
	private final UserRepository userRepository; // Added dependency
	private final AnnouncementRepository announcementRepository; // Added dependency
	private final ProjectRepository projectRepository; // added
	private final FullUserMapper fullUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;

	private Company findCompany(Long id) {
		return companyRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("A company with the provided id does not exist."));
	}

	private User findUserById(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("A user with the provided id does not exist."));
	}

	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>(company.getEmployees());
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		return announcementMapper.entitiesToDtos(new HashSet<>(sortedList));
	}

	// create annnouncement
	@Override
	public AnnouncementDto createAnnouncement(Long companyId, AnnouncementDto announcementDto) {
		// Validate company
		Company company = findCompany(companyId);

		// Validate author
		User author = findUserById(announcementDto.getAuthor().getId());
		if (!author.isActive()) {
			throw new BadRequestException("The author must be an active user.");
		}

		// Map DTO to entity and set required fields
		Announcement announcement = announcementMapper.dtoToEntity(announcementDto);
		announcement.setCompany(company);
		announcement.setAuthor(author);
		announcement.setDate(Timestamp.from(Instant.now()));

		// Save and return as DTO
		Announcement savedAnnouncement = announcementRepository.save(announcement);
		return announcementMapper.entityToDto(savedAnnouncement);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = teamRepository.findById(teamId)
				.orElseThrow(() -> new NotFoundException("Team with id " + teamId + " does not exist."));

		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("Team with id " + teamId + " does not exist in the company.");
		}

		Set<Project> filteredProjects = new HashSet<>(team.getProjects());
		filteredProjects.removeIf(project -> !project.isActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}

	@Override
	public ProjectDto createProject(Long companyId, Long teamId, ProjectDto projectDto) {
		// Validate the company
		Company company = findCompany(companyId);
	
		// Validate the team and ensure it belongs to the specified company
		Team team = teamRepository.findById(teamId)
				.orElseThrow(() -> new NotFoundException("Team with ID " + teamId + " does not exist."));
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("Team with ID " + teamId + " does not belong to company with ID " + companyId + ".");
		}
	
		// Validate the incoming project DTO
		if (projectDto.getName() == null || projectDto.getName().trim().isEmpty()) {
			throw new BadRequestException("Project name cannot be null or empty.");
		}
		if (projectDto.getDescription() == null || projectDto.getDescription().trim().isEmpty()) {
			throw new BadRequestException("Project description cannot be null or empty.");
		}
	
		// Map the incoming DTO to a Project entity
		Project project = projectMapper.dtoToEntity(projectDto);
	
		// Associate the project with the team
		project.setTeam(team);
	
		// Save the project to the database
		Project savedProject = projectRepository.save(project);
	
		// Convert the saved entity back to a DTO and return it
		return projectMapper.entityToDto(savedProject);
	}
	
	
}
