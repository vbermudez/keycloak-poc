package com.versia.poc.keycloakback.representations;

/**
 * Solo un ejemplo
 */
public class TokenRepresentation {
    private String user;
    private String token;

    public TokenRepresentation(String user, String token) {
        this.user = user;
        this.token = token;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String value) {
        user = value;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String value) {
        token = value;
    }
}