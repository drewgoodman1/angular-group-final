package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
	
	@GetMapping("/{id}/users")
    @CrossOrigin(origins="*")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@GetMapping("/{id}/announcements")
    @CrossOrigin(origins="*")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@GetMapping("/{id}/teams")
    @CrossOrigin(origins="*")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects") 
    @CrossOrigin(origins="*")
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}

    @PostMapping("/{id}/announcements")
    @CrossOrigin(origins="*")
    public AnnouncementDto createAnnouncement(@PathVariable Long id, @RequestBody AnnouncementDto announcementDto) {
        return companyService.createAnnouncement(id, announcementDto);
    }

    @PostMapping("/{companyId}/teams/{teamId}/projects")
    @CrossOrigin(origins="*")
    public ProjectDto createProject(
            @PathVariable Long companyId,
            @PathVariable Long teamId,
            @RequestBody ProjectDto projectDto) {
        // Delegate the logic to the service layer
        return companyService.createProject(companyId, teamId, projectDto);
    }

    @PatchMapping("/{companyId}/teams/{teamId}/projects/{projectId}")
    @CrossOrigin(origins="*")
    public ProjectDto updateProject(
            @PathVariable Long companyId,
            @PathVariable Long teamId,
            @PathVariable Long projectId,
            @RequestBody ProjectDto projectDto) {
        return companyService.updateProject(companyId, teamId, projectId, projectDto);
    }     


}
