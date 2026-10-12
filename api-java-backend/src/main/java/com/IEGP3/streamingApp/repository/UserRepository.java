package com.IEGP3.streamingApp.repository;

import com.IEGP3.streamingApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/** TODO: declare only the queries needed by the service layer. */
public interface UserRepository extends JpaRepository<User, Long> {
}
