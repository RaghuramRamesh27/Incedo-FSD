package com.example.demo.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.LoginRequestDTO;
import com.example.demo.Dto.UserDTO;
import com.example.demo.Dto.UserSessionDTO;
import com.example.demo.entitie.Session;
import com.example.demo.entitie.User;
import com.example.demo.repo.SessionRepository;
import com.example.demo.repo.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private SessionRepository sessionRepository;

	// Register

	public String registerNewUser(UserDTO registrationRequest) {

		if (userRepository.findByEmail(registrationRequest.getEmail()) != null) {
			return "User with this email already exists";
		}

		User user = new User();
		user.setEmail(registrationRequest.getEmail());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
		user.setRole(registrationRequest.getRole());

		userRepository.save(user);

		return "User registered successfully";
	}

	// Login

	public String loginUser(LoginRequestDTO loginRequest) {
		User user = userRepository.findByEmail(loginRequest.getEmail());
		if (user == null) {
			return "User not found";
		}
		if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {

			if ("USER".equalsIgnoreCase(user.getRole().name())) {
				Session session = new Session();
				session.setUser(user);
				session.setEntryTime(LocalDateTime.now());
				sessionRepository.save(session);
				System.out.print("in login ");

				System.out.print(session.getId());
			}
			return "Login successful";
		} else {
			return "Invalid credentials";
		}
	}

	// Logout

	public String logoutUser(String email) {

		User user = userRepository.findByEmail(email);
		if (user == null) {
			return "User not found";
		}

		if (!"USER".equalsIgnoreCase(user.getRole().name())) {
			return "Admins do not have active sessions";
		}

		Optional<Session> sessionOptional = sessionRepository.findFirstByUserIdAndExitTimeIsNull(user.getId());
		if (sessionOptional.isEmpty()) {
			return "No active session found";
		}

		Session session = sessionOptional.get();
		System.out.print("in logout " + session.getId());

		System.out.println(LocalDateTime.now());

		session.setExitTime(LocalDateTime.now());
		sessionRepository.save(session);

		return "Logout successful";
	}

	// Role

	public String roleSender(String email) {
		User user = userRepository.findByEmail(email);
		if (user == null) {
			return "User not found";
		}
		return user.getRole().toString();
	}

	// Session
	
	public List<UserSessionDTO> getAllUserSessions() {
		List<Session> sessions = sessionRepository.findAll();

		DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

		return sessions.stream().map(session -> {
			LocalDateTime entryTime = session.getEntryTime();
			LocalDateTime exitTime = session.getExitTime();
			String entryTimeFormatted = entryTime.format(timeFormatter) + " " + entryTime.format(dateFormatter);
			String exitTimeFormatted = (exitTime != null)
					? exitTime.format(timeFormatter) + " " + exitTime.format(dateFormatter)
					: null;
			return new UserSessionDTO(session.getUser().getEmail(), entryTime, exitTime, entryTimeFormatted,
					exitTimeFormatted);
		}).sorted(Comparator.comparing(UserSessionDTO::getEntryTime).thenComparing(UserSessionDTO::getExitTime,
				Comparator.nullsLast(Comparator.naturalOrder()))).collect(Collectors.toList());
	}
}