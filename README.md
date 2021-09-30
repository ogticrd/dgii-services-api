# Servicios de la DGII

[![Prod Deployment](https://github.com/opticrd/dgii-services-api/actions/workflows/prod-cd.yml/badge.svg)](https://github.com/opticrd/dgii-services-api/actions/workflows/prod-cd.yml)

## Tabla de contenidos

- [Servicios de la DGII](#servicios-de-la-dgii)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción y contexto](#descripción-y-contexto)
  - [Referencia del servicio](#referencia-del-servicio)
  - [Cómo iniciar](#cómo-iniciar)
  - [Stack de desarrollo](#stack-de-desarrollo)
    - [Servidor](#servidor)
    - [Base de datos](#base-de-datos)
  - [Autores](#autores)

## Descripción y contexto

---

Este servicio es un [wrapper](https://es.quora.com/Qu%C3%A9-es-exactamente-un-wrapper-API-Y-en-qu%C3%A9-se-diferencia-de-solo-una-API) de los servicios de información de la [Dirección General de Impuestos Internos (DGII)](https://dgii.gov.do/wsMovilDGII/WSMovilDGII.asmx).

## Referencia del servicio

- [Documentación oficial](https://developers.digital.gob.do)

## Cómo iniciar

1. Configuración del repositorio

```sh
    # Clonar repositorio
    git clone https://github.com/opticrd/dgii-services-api.git;
```

2. Declarar y definir las variables de entorno

```sh
    # Crear archivo de variables de entorno
    cd dgii-services-api;
    touch .env;
```

```sh
    # Application
    PORT=
    API_VERSION=
    NODE_ENV=

    # DGII Service
    DGII_WSDL_URI=https://dgii.gov.do/wsMovilDGII/WSMovilDGII.asmx?WSDL
    DGII_WSDL_PAGINATION_LIMIT=20
```

3. Instalar dependecias

```sh
    yarn
```

4. Correr proyecto

```sh
    npm run start:dev
```

## Stack de desarrollo

### Servidor

- Node.js
  - Nest.js Framework

### Base de datos

- Postgres

## Autores

Septiembre 2021

- [Marluan Espiritusanto](https://github.com/marluanespiritusanto)
