package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entitie.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
 
	
	User findByEmail(String email);
}
