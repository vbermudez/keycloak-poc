package com.versia.poc.keycloakback.representations;

import java.util.HashMap;
import java.util.Map;

public class UserInfoRepresentation {
    private String id;
    private String userName;
    private Map<String, Object> otherClaims;
    
    public UserInfoRepresentation() { }
    
    public UserInfoRepresentation(String id, String userName, Map<String, Object> otherClaims) {
        this.id = id;
        this.userName = userName;
        this.otherClaims = otherClaims;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Map<String,Object> getOtherClaims() {
        return this.otherClaims;
    }

    public void setOtherClaims(Map<String,Object> otherClaims) {
        this.otherClaims = otherClaims;
    }

    public void addOtherClaim(String key, Object value) {
        if (otherClaims == null) otherClaims = new HashMap<>();

        otherClaims.put(key, value);
    }

    public Object getOtherClaim(String key) {
        if (otherClaims == null) return null;

        return otherClaims.get(key);
    }
}