package com.example.building.model;

import java.util.*;

public class Building {

    private double requestedTemperature = 25.0;

    private List<Apartment> apartments = new ArrayList<>();
    private List<CommonRoom> commonRooms = new ArrayList<>();

    // GETTERS
    public double getRequestedTemperature() {
        return requestedTemperature;
    }

    public List<Apartment> getApartments() {
        return apartments;
    }

    public List<CommonRoom> getCommonRooms() {
        return commonRooms;
    }

    // SETTER
    public void setRequestedTemperature(double requestedTemperature) {
        this.requestedTemperature = requestedTemperature;
    }

    // APARTMENTS
    public void addApartment(String id, String owner) {
        apartments.add(new Apartment(id, owner));
    }

    public void deleteApartment(String id) {
        apartments.removeIf(a -> a.getId().equals(id));
    }

    // COMMON ROOMS
    public void addCommonRoom(String id, String type) {
        commonRooms.add(new CommonRoom(id, type));
    }

    public void deleteCommonRoom(String id) {
        commonRooms.removeIf(c -> c.getId().equals(id));
    }
}