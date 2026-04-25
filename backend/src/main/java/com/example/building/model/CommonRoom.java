package com.example.building.model;

import lombok.Data;

@Data
public class CommonRoom {

    private String id;
    private String type;

    private double temperature = 25.0;
    private boolean coolingOn = false;
    private boolean heatingOn = false;

    public CommonRoom(String id, String type) {
        this.id = id;
        this.type = type;
    }
}