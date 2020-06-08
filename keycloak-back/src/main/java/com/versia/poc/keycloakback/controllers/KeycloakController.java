package com.versia.poc.keycloakback.controllers;

import com.versia.poc.keycloakback.representations.TokenRepresentation;
import com.versia.poc.keycloakback.representations.UserAuthzRepresentation;

import org.keycloak.authorization.client.AuthzClient;
import org.keycloak.representations.idm.authorization.AuthorizationRequest;
import org.keycloak.representations.idm.authorization.AuthorizationResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

// @RestController
public class KeycloakController {
    
    /**
     * Sólo como ejemplo!!!!
     * Autentica / autoriza a un usuario. Nótese que este no es el mejor medio de
     * autenticación, ya que jamás deberían pasarse usuario/clave al consumir un
     * servicio.
     * 
     * @param body Representación del objeto JSON enviado en el cuerpo de la
     *             petición.
     * @return Representación del token de usuario, o null si no se ha podido
     *         autenticar.
     */
    // @PostMapping("/auth")
    public TokenRepresentation authorize(@RequestBody UserAuthzRepresentation body) {
        if (body == null) return null; // Debería devolver un estado HTTP de error, o código de error al cliente
        
        System.out.println( String.format("Validando USUARIO/CLAVE: %s/%s", body.getUser(), body.getPassword()) );

        AuthzClient client = AuthzClient.create();
        AuthorizationRequest request = new AuthorizationRequest();
        AuthorizationResponse response = client.authorization(body.getUser(), body.getPassword()).authorize(request);
        String token = response.getToken();

        System.out.println( String.format("ID TOKEN: %s, EXPIRES: %n, SESSION STATE: %s", response.getIdToken(), response.getExpiresIn(), response.getSessionState()) );
        System.out.println( String.format("REFRESH TOKEN: %s, EXPIRES: %n, TOKEN TYPE: %s", response.getRefreshToken(), response.getRefreshExpiresIn(), response.getTokenType()) );

        if (token == null || token.isEmpty()) return null; // Debería devolver un estado HTTP de error, o código de error al cliente

        return new TokenRepresentation(body.getUser(), token);
    }

    @GetMapping("/unauthorized")
    public String unauthorized() {
        return "No autorizad@";
    }
}