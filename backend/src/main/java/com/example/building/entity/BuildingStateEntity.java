package com.example.building.entity;

import jakarta.persistence.*;

@Entity
public class BuildingStateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double requestedTemperature = 25.0;

    public BuildingStateEntity() {}

    public double getRequestedTemperature() {
        return requestedTemperature;
    }

    public void setRequestedTemperature(double requestedTemperature) {
        this.requestedTemperature = requestedTemperature;
    }
}