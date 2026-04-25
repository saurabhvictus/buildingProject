package com.example.building.repository;

import com.example.building.entity.CommonRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommonRoomRepository extends JpaRepository<CommonRoomEntity, String> {
}