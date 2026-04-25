package com.example.building.entity;

import jakarta.persistence.*;

@Entity
public class CommonRoomEntity {

    @Id
    private String id;

    private String type;

    private double temperature = 25.0;

    private boolean coolingOn;
    private boolean heatingOn;

    public CommonRoomEntity() {}

    public CommonRoomEntity(String id, String type) {
        this.id = id;
        this.type = type;
    }

    public String getId() { return id; }
    public String getType() { return type; }

    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }

    public boolean isCoolingOn() { return coolingOn; }
    public void setCoolingOn(boolean coolingOn) { this.coolingOn = coolingOn; }

    public boolean isHeatingOn() { return heatingOn; }
    public void setHeatingOn(boolean heatingOn) { this.heatingOn = heatingOn; }
}