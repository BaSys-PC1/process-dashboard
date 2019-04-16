# Industrie 4.0 Process Controller WebGUI

This project serves as a [BPMN](http://www.bpmn.org/) process controller visualization using the [Camunda](https://camunda.org/) process visualization engine.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisities

1) Install the [Spring Tool Suite](https://spring.io/tools).

2) Install [Lombok](https://projectlombok.org/) eclipse IDE plugin.

3) Install [Gradle IDE Pack](https://marketplace.eclipse.org/content/gradle-ide-pack) eclipse plugin.

You also need an installed MQTT broker, e.g:
  - [HiveMQ](http://www.hivemq.com/) 
  or
  - [ActiveMQ](http://activemq.apache.org/)

### Installing

process.webgui needs [Spring](https://spring.io/) to run. In addition, a MQTT broker has to run.

1) Import the project into the Spring Tool Suite as Git-Project (File -> Import -> Git -> Project from Git -> Clone URI).

2) Convert the porject to a STS Gradle-Project (Configure -> Convert to Gradle (STS) Project).

2) Build the project using Gradle (clean build).

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

### Starting the Projects
1) Start the project (Run as -> Spring Boot App).

2) Navigate to localhost:port to see if it is running.

## Docker

### Build and push Docker image

```bash
gradle clean build
docker build -t lns-90165.sb.dfki.de:5000/dfki/basys-process-dashboard .
docker push lns-90165.sb.dfki.de:5000/dfki/basys-process-dashboard
```

### Start as Docker container:
```bash
docker run -d -p 8089:8000 --name basys-process-dashboard lns-90165.sb.dfki.de:5000/dfki/basys-process-dashboard --camunda.rest.base.url=http://lns-90165.sb.dfki.de:8080/engine-rest/engine/default
```

## Contributing
Authors

* **Philipp Staudt**
* **Sönke Knoch** - Profile at [DFKI](https://www.dfki.de/web/forschung/iui/mitarbeiter/base_view?uid=sokn01)
* **Daniel Porta** - Profile at [DFKI](https://www.dfki.de/web/forschung/iui/mitarbeiter/base_view?uid=dapo01)

## Used 3rd Party Libraries and Licenses
* see folder 3rd_party_licenses