package com.versia.poc.keycloakback.controllers;

import com.versia.poc.keycloakback.representations.UserInfoRepresentation;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.RefreshableKeycloakSecurityContext;
import org.keycloak.representations.AccessToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api")
public class SecuredApiController {

    @GetMapping("/userinfo")
    public UserInfoRepresentation getUserInfo(KeycloakPrincipal<RefreshableKeycloakSecurityContext> principal) {
        if (principal == null) return null;

        AccessToken token = principal.getKeycloakSecurityContext().getToken();

        if (token == null) return null;

        return new UserInfoRepresentation(token.getId(), token.getName(), token.getOtherClaims());
    }
}