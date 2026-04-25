package com.example.building.service;

import com.example.building.entity.*;
import com.example.building.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {

    private final ApartmentRepository apartmentRepo;
    private final CommonRoomRepository roomRepo;
    private final BuildingStateRepository stateRepo;

    public BuildingService(
            ApartmentRepository apartmentRepo,
            CommonRoomRepository roomRepo,
            BuildingStateRepository stateRepo
    ) {
        this.apartmentRepo = apartmentRepo;
        this.roomRepo = roomRepo;
        this.stateRepo = stateRepo;
    }

    // -------- BUILDING TEMP --------

    public double getRequestedTemperature() {
        return stateRepo.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> stateRepo.save(new BuildingStateEntity()))
                .getRequestedTemperature();
    }

    public void setRequestedTemperature(double value) {
        BuildingStateEntity state = stateRepo.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> new BuildingStateEntity());

        state.setRequestedTemperature(value);
        stateRepo.save(state);
    }

    // -------- APARTMENTS --------

    public List<ApartmentEntity> getApartments() {
        return apartmentRepo.findAll();
    }

    public void addApartment(String id, String owner) {
        apartmentRepo.save(new ApartmentEntity(id, owner));
    }

    public void deleteApartment(String id) {
        apartmentRepo.deleteById(id);
    }

    // -------- COMMON ROOMS --------

    public List<CommonRoomEntity> getCommonRooms() {
        return roomRepo.findAll();
    }

    public void addCommonRoom(String id, String type) {
        roomRepo.save(new CommonRoomEntity(id, type));
    }

    public void deleteCommonRoom(String id) {
        roomRepo.deleteById(id);
    }

    // -------- BULK SAVE (ADD THIS) --------

    public void saveAll(List<ApartmentEntity> apartments, List<CommonRoomEntity> rooms) {
        apartmentRepo.saveAll(apartments);
        roomRepo.saveAll(rooms);
    }
}