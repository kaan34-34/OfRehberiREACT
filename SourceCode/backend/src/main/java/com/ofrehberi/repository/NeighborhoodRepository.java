package com.ofrehberi.repository;

import com.ofrehberi.entity.Neighborhood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NeighborhoodRepository extends JpaRepository<Neighborhood, String> {
}
