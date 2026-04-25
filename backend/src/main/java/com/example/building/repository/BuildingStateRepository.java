package com.example.building.repository;

import com.example.building.entity.BuildingStateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingStateRepository extends JpaRepository<BuildingStateEntity, Long> {
}