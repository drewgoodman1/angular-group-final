package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
	private final CompanyRepository companyRepository;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

	@Override
	public FullUserDto createUser(UserRequestDto userRequestDto, Long companyId) {
		User user = new User();
		
		CredentialsDto credDto = userRequestDto.getCredentials();
		Credentials cred = new Credentials();
		cred.setUsername(credDto.getUsername());
		cred.setPassword(credDto.getPassword());
		user.setCredentials(cred);
		
		ProfileDto profileDto = userRequestDto.getProfile();
        Profile profile = new Profile();
        profile.setFirstName(profileDto.getFirstName());
        profile.setLastName(profileDto.getLastName());
        profile.setEmail(profileDto.getEmail());
        profile.setPhone(profileDto.getPhone());
        user.setProfile(profile);

        user.setAdmin(userRequestDto.isAdmin());
        user.setActive(false);
        user.setStatus("PENDING");
        
        Set<Company> comp = new HashSet<Company>();
        comp.add(companyRepository.findById(companyId).get());
        user.setCompanies(comp);
        
        userRepository.save(user);
        
        return fullUserMapper.entityToFullUserDto(user);
	}
	
	

}
