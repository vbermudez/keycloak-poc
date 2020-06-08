# Prueba de concepto KeyCloak

Para ejecutar la prueba de concepto, es necesario tener instalado [Docker](https://www.docker.com/).

La **POC** se compone de los siguientes contenedores:
- Base de datos [MariaDB](https://mariadb.com/), en el contenedor `mariadb`.
- Servidor [KeyCloak](https://www.keycloak.org/), en el contenedor `keycloak`.
- Proyecto de micro-servicios REST, usando [Spring Boot](https://spring.io/projects/spring-boot) (sobre _Java8_), en el contenedor `keycloak-back`.
- Proyecto de aplicación cliente, usando [Angular](https://angular.io/), en el contendor `keycloak-front`.

Para construir e iniciar el conjunto, únicamente es necesario ejecutar:

```shell 
docker-compose up --build
```

Las posteriores ejecuciones el conjunto, sólo se deben iniciar con `docker-compose up`. 

---

## Índice

- [Prueba de concepto KeyCloak](#prueba-de-concepto-keycloak)
  - [Índice](#índice)
  - [Acceso e inicio de sesión](#acceso-e-inicio-de-sesión)
  - [Configuración en Keycloak](#configuración-en-keycloak)
  - [Posbles problemas al inciar el contenedor de Keycloak](#posbles-problemas-al-inciar-el-contenedor-de-keycloak)

---

## Acceso e inicio de sesión

- Para acceder al servidor **Keycloak**, navegar a [http://localhost:8080/auth](http://localhost:8080/auth). Iniciar sesión con el usuario _admin_, y la clave _Pa55w0rd_.

- Para acceder al cliente **keycloak-front**, navegar a [http://localhost:4200](http://localhost:4200). Iniciar sesión con el usuario creado durante la configuración de **Keycloak**.

- Se se necesitan realizar pruebas de los servicios _REST_ de proyecto **keycloak-back**, se puede acceder a través de [http://localhost:8081](http://localhost:8081). Será necesario iniciar una sesión y obtener un _token OpenID_ del servidor **Keycloak**.

---

## Configuración en Keycloak

Es necesario realizar una configuración básica en el servidor, para el correcto funcionamiento de esta prueba de concepto. Los pasos a seguir son estos:

1. Ejecutar `docker-compose up --build`, para construir e iniciar los contenedores.
2. Iniciar sesión en [http://localhost:8080/auth](http://localhost:8080/auth).
   1. Usuario: admin
   2. Clave: Pa55w0rd
3. Crear un nuevo "realm", con el nombre _hello-world-authz_. A partir de este momento, todas las configuraciones se realizan con este reino.
![Reino creado][create-realm]
4.  Crear el rol _user_.
5. Crear el grupo _TestGroup_.
6. Crear un nuevo usuario.
   1. Se deberían informar los campos **Username**, **Email**, **First Name** y **Last Name**.
   2. Activar el selector **User enabled** y presionar el botón **Save**.
    ![Nuevo usuario][create-user]
   3. Ir a la pestaña **Credential** y rellenar los campos **New Password** y **Confirm new password**.
   4. Presionar sobre el selector **Temporary** para establecerlo a _OFF_.
   5. Presina el botón **Set Password**.
    ![Reestablecer clave][reset-user-pwd]
   6. En la pestaña _Groups_ debe asignarse al grupo _TestGroup_.
    ![Grupos del usuario][user-groups]
   7. En la pestaña _Role Mappings_ debe asignarse el rol _user_.
    ![Roles del usuario][user-roles]
7. Añadir el cliente _keycloak-front_.
   1. Se deben informar los campos: 
      1. **Client ID** = keycloak_front
      2. **Client Protocol** = openid-client
      3. **Root URL** = http://localhost:4200
    ![Crear cliente][create-client]
   2. Presionar el botón **Save**.
   3. En la pestaña _Settings_ del nuevo cliente, comprobar que la configuración es la que sigue:
    ![Cliente keycloak-front][keycloak-front]
8. Añadir el cliente _keycloak-back_.
   1. Se deben informar los campos: 
      1. **Client ID** = keycloak-back
      2. **Client Protocol** = openid-client
      3. **Root URL** = http://localhost:8081
   2. Presionar el botón **Save**.
   3. En la pestaña _Settings_ del nuevo cliente, comprobar que la configuración es la que sigue:
    ![Cliente keycloak-back][keycloak-back]

---

## Posbles problemas al inciar el contenedor de Keycloak

Es posible que en las posteriores inicializaciones del contenedor _keycloak_, resulten errorde creación del usuario administrador, o del protocolo de descubrimiento de JGroups. 
Si esto sucediera, únicamente será necesario comentar las siguiente líneas, del servicio **keycloak**, en el fichero `docker-compose.yaml`:

```yaml
keycloak:
    image: quay.io/keycloak/keycloak:latest
    environment:
      DB_VENDOR: mariadb
      DB_ADDR: mariadb
      DB_DATABASE: keycloak
      DB_USER: keycloak
      DB_PASSWORD: password
    #   KEYCLOAK_USER: admin
    #   KEYCLOAK_PASSWORD: Pa55w0rd
    #   JGROUPS_DISCOVERY_PROTOCOL: JDBC_PING
    #   JGROUPS_DISCOVERY_PROPERTIES: datasource_jndi_name=java:jboss/datasources/KeycloakDS,info_writer_sleep_time=500
```


[create-realm]: imgs/create-realm.png "Reino creado"
[create-user]: imgs/create-user.png "Crear usuario"
[reset-user-pwd]: imgs/reset-user-pwd.png "Reestablecer clave"
[user-groups]: imgs/user-groups.png "Grupos del usuario"
[user-roles]: imgs/user-roles.png "Roles del usuario"
[create-client]: imgs/create-client.png "Crear cliente"
[keycloak-front]: imgs/keycloak-front.png "Cliente keycloak-front"
[keycloak-back]: imgs/keycloak-back.png "Cliente keycloak-back"
