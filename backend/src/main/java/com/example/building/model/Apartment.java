package com.example.building.model;

import lombok.Data;

@Data
public class Apartment {

    private String id;
    private String ownerName;

    private double temperature = 25.0;
    private boolean coolingOn = false;
    private boolean heatingOn = false;

    public Apartment(String id, String ownerName) {
        this.id = id;
        this.ownerName = ownerName;
    }
}