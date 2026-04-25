package com.example.building.entity;

import jakarta.persistence.*;

@Entity
public class ApartmentEntity {

    @Id
    private String id;

    private String ownerName;

    private double temperature = 25.0;

    private boolean coolingOn;
    private boolean heatingOn;

    public ApartmentEntity() {}

    public ApartmentEntity(String id, String ownerName) {
        this.id = id;
        this.ownerName = ownerName;
    }

    public String getId() { return id; }
    public String getOwnerName() { return ownerName; }

    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }

    public boolean isCoolingOn() { return coolingOn; }
    public void setCoolingOn(boolean coolingOn) { this.coolingOn = coolingOn; }

    public boolean isHeatingOn() { return heatingOn; }
    public void setHeatingOn(boolean heatingOn) { this.heatingOn = heatingOn; }
}