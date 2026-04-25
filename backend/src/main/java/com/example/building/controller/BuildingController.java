package com.example.building.controller;

import com.example.building.entity.ApartmentEntity;
import com.example.building.entity.CommonRoomEntity;
import com.example.building.service.BuildingService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class BuildingController {

    private final BuildingService service;

    public BuildingController(BuildingService service) {
        this.service = service;
    }

    // ✅ FIX: restore /building endpoint
    @GetMapping("/building")
    public Map<String, Object> getBuilding() {
        Map<String, Object> res = new HashMap<>();

        res.put("apartments", service.getApartments());
        res.put("commonRooms", service.getCommonRooms());
        res.put("requestedTemperature", service.getRequestedTemperature());

        return res;
    }

    @GetMapping("/apartments")
    public List<ApartmentEntity> getApartments() {
        return service.getApartments();
    }

    @GetMapping("/common-rooms")
    public List<CommonRoomEntity> getCommonRooms() {
        return service.getCommonRooms();
    }

    @PutMapping("/temperature")
    public String updateTemperature(@RequestParam double value) {
        service.setRequestedTemperature(value);
        return "Temperature updated";
    }

    @PostMapping("/apartment")
    public void addApartment(@RequestParam String id, @RequestParam String owner) {
        service.addApartment(id, owner);
    }

    @DeleteMapping("/apartment/{id}")
    public void deleteApartment(@PathVariable String id) {
        service.deleteApartment(id);
    }

    @PostMapping("/common-room")
    public void addCommonRoom(@RequestParam String id, @RequestParam String type) {
        service.addCommonRoom(id, type);
    }

    @DeleteMapping("/common-room/{id}")
    public void deleteCommonRoom(@PathVariable String id) {
        service.deleteCommonRoom(id);
    }
}