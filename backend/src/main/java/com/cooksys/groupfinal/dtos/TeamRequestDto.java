package com.cooksys.groupfinal.dtos;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TeamRequestDto {
	private String name;
	private String description;
	private Long companyId;
	private List<Long> userIds;
}
