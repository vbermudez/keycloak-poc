// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false

  , apiUrl: 'http://localhost:8081/api'

  , openIdRedirectUrl: 'http://localhost:4200/auth-callback'
  , openIdLogoutRedirectUrl: 'http://localhost:4200/logout-callback'
  , openIdConfigUri: 'realms/hello-world-authz/.well-known/openid-configuration'
  , openIdClientConfig: {
    realm: 'hello-world-authz'
    , 'auth-server-url': 'http://localhost:8080/auth/'
    , 'ssl-required': 'external'
    , resource: 'keycloak-front'
    , 'public-client': true
    , 'verify-token-audience': true
    // , credentials: {
    //   secret: 'ca835977-1c7a-4232-b09d-d6c4ce952f32'
    // }
    , 'use-resource-role-mappings': true
    , 'confidential-port': 0
    // , 'policy-enforcer': {}
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
