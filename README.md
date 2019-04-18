# BaSys 4.0 Process Dashboard

This dashboard serves as a live process visualization for [BPMN](http://www.bpmn.org/) processes using the [Camunda](https://camunda.org/) BPM engine.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisities

1) Install the [Spring Tool Suite](https://spring.io/tools).

2) Install the [Gradle IDE Pack](https://marketplace.eclipse.org/content/gradle-ide-pack) eclipse plugin.

3) Install the [Camunda BPM Platform](https://camunda.com/download/)

### Installing

The process dashboard needs [Spring](https://spring.io/) to run.

1) Import the project into the Spring Tool Suite as Git-Project (File -> Import -> Git -> Project from Git -> Clone URI).

2) Convert the porject to a STS Gradle-Project (Configure -> Convert to Gradle (STS) Project).

3) Build the project using Gradle (clean build).

### Configuration

All configurations are done in the following properties files: 
- **src/main/resources/application.properties**

#### General Configuring

| KEY                          | VALUE |
| ------                       | ------ |
| `server.port`                | Port on which the web-services (REST) are available, e.g. 8080  |

#### Camunda Configuring

| KEY                          | VALUE |
| ------                       | ------ |
| `camunda.rest.base.url`      | Camunda Process engine REST endpoint. |

### Starting the Dashboard
1) Start the project (Run as -> Spring Boot App).

2) Navigate to localhost:port to see if it is running.

## Docker

### Build and push Docker image

```bash
docker build -t dfkibasys/process-dashboard .
```

### Start as Docker container:
Forwarding exposed port 8000 to 8081 and assuming Camunda is running on localhost.

```bash
docker run -d -p 8081:8000 --name process-dashboard dfkibasys/process-dashboard --camunda.rest.base.url=http://localhost:8080/engine-rest/engine/default
```

### Docker Compose

```bash
  camunda:
    image: camunda/camunda-bpm-platform:latest
    container_name: camunda
    ports:
        - "8080:8080"
    restart: always
  process-dashboard:
    image: dfkibasys/process-dashboard:latest
    container_name: process-dashboard
    command: --camunda.rest.base.url=http://camunda:8080/engine-rest/engine/default
    ports:
        - "8081:8000"
    links:
        - camunda
    restart: always

```

## Contributing
Authors

* **Philipp Staudt** - Profile at [DFKI](https://www.dfki.de/web/ueber-uns/mitarbeiter/person/phst02)
* **Sönke Knoch** - Profile at [DFKI](https://www.dfki.de/web/ueber-uns/mitarbeiter/person/sokn01)
* **Daniel Porta** - Profile at [DFKI](https://www.dfki.de/web/ueber-uns/mitarbeiter/person/dapo01/)

## Used 3rd Party Libraries and Licenses
* see folder 3rd_party_licenses