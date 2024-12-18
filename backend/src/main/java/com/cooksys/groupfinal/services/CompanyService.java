package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;

public interface CompanyService {

	Set<FullUserDto> getAllUsers(Long id);

	Set<AnnouncementDto> getAllAnnouncements(Long id);

	Set<TeamDto> getAllTeams(Long id);

	Set<ProjectDto> getAllProjects(Long companyId, Long teamId);

	// New method to create an announcement
	AnnouncementDto createAnnouncement(Long companyId, AnnouncementDto announcementDto);

	// New method to create a project
	ProjectDto createProject(Long companyId, Long teamId, ProjectDto projectDto);

	// New method for updating projects
	ProjectDto updateProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto);

}
