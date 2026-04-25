package com.example.building.service;

import com.example.building.entity.ApartmentEntity;
import com.example.building.entity.CommonRoomEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class TemperatureSimulationService {

    private final BuildingService buildingService;
    private final Random random = new Random();

    private static final double THRESHOLD = 0.5;
    private static final double STEP = 0.3; // smooth speed (important for stability)

    public TemperatureSimulationService(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @Scheduled(fixedRate = 3000)
    public void updateTemperature() {

        double target = buildingService.getRequestedTemperature();

        List<ApartmentEntity> apartments = buildingService.getApartments();
        List<CommonRoomEntity> rooms = buildingService.getCommonRooms();

        // ================= APARTMENTS =================
        for (ApartmentEntity a : apartments) {

            double temp = a.getTemperature();
            double diff = temp - target;

            // ❗ ONLY drift when far away
            if (Math.abs(diff) > THRESHOLD) {
                temp += (random.nextDouble() - 0.5) * 0.5;
            }

            // 🔥 smooth convergence (MAIN FIX)
            temp += -diff * STEP;

            a.setTemperature(temp);

            // STATUS
            updateStatus(a, temp, target);
        }

        // ================= COMMON ROOMS =================
        for (CommonRoomEntity r : rooms) {

            double temp = r.getTemperature();
            double diff = temp - target;

            if (Math.abs(diff) > THRESHOLD) {
                temp += (random.nextDouble() - 0.5) * 0.5;
            }

            temp += -diff * STEP;

            r.setTemperature(temp);

            updateStatus(r, temp, target);
        }

        buildingService.saveAll(apartments, rooms);
    }

    // ================= STATUS LOGIC =================
    private void updateStatus(Object obj, double temp, double target) {

        boolean heating = temp < target - THRESHOLD;
        boolean cooling = temp > target + THRESHOLD;

        if (obj instanceof ApartmentEntity a) {
            a.setHeatingOn(heating);
            a.setCoolingOn(cooling);
        }

        if (obj instanceof CommonRoomEntity r) {
            r.setHeatingOn(heating);
            r.setCoolingOn(cooling);
        }
    }
}