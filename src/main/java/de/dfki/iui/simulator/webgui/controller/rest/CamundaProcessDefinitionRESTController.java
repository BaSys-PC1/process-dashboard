package de.dfki.iui.simulator.webgui.controller.rest;

import java.net.URI;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/rest")
public class CamundaProcessDefinitionRESTController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private Environment env;

    @RequestMapping("process-definition/count")
    public Object getProcessDefinitionCount(@RequestParam Map<String, String> allRequestParams) {
        UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
                .fromUriString(env.getProperty("camunda.rest.base.url")).path("/process-definition/count");

        allRequestParams.forEach(targetUrlBuilder::queryParam);

        URI targetUrl = targetUrlBuilder.build().encode().toUri();

        return restTemplate.getForObject(targetUrl.toString(), Object.class);
    }

    @RequestMapping("process-definition")
    public Object queryProcessDefinition(@RequestParam Map<String, String> allRequestParams) {
        UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
                .fromUriString(env.getProperty("camunda.rest.base.url")).path("/process-definition");

        allRequestParams.forEach(targetUrlBuilder::queryParam);

        URI targetUrl = targetUrlBuilder.build().encode().toUri();

        return restTemplate.getForObject(targetUrl.toString(), Object.class);
    }

    @RequestMapping("process-definition/{id}")
    public Object getProcessDefinition(@PathVariable("id") String id) {
        return restTemplate.getForObject(env.getProperty("camunda.rest.base.url") + "/process-definition/" + id,
                Object.class);
    }

    @RequestMapping("process-definition/{id}/xml")
    public Object getProcessDefinitionXML(@PathVariable("id") String id) {
        return restTemplate.getForObject(
                env.getProperty("camunda.rest.base.url") + "/process-definition/" + id + "/xml", Object.class);
    }

    @RequestMapping(value = "process-definition/{id}/start", method = RequestMethod.POST)
    public Object postProcessDefinition(@PathVariable("id") String id, @RequestBody String body) {
        UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
                .fromUriString(env.getProperty("camunda.rest.base.url")).path("/process-definition/").path(id)
                .path("/start");

        URI targetUrl = targetUrlBuilder.build().encode().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(body, headers);

        return restTemplate.postForEntity(targetUrl.toString(), entity, Object.class);
    }

}
