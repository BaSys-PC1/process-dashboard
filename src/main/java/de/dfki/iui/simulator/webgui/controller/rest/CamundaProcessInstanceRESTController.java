package de.dfki.iui.simulator.webgui.controller.rest;

import java.net.URI;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/rest")
public class CamundaProcessInstanceRESTController {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private Environment env;

	@RequestMapping("/process-instance/count")
	public Object getProcessInstanceCount(@RequestParam Map<String, String> allRequestParams) {
		UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
				.fromUriString(env.getProperty("camunda.rest.base.url")).path("/process-instance/count");

		allRequestParams.forEach((k, v) -> {
			targetUrlBuilder.queryParam(k, v);
		});
		
		URI targetUrl = targetUrlBuilder.build().encode().toUri();
		
		return restTemplate.getForObject(targetUrl.toString(), Object.class);
	}

	@RequestMapping("/process-instance/{id}/activity-instances")
	public Object getProcessInstanceActivityInstances(@PathVariable("id") String id) {
		return restTemplate.getForObject(
				env.getProperty("camunda.rest.base.url") + "/process-instance/" + id + "/activity-instances",
				Object.class);
	}

	@RequestMapping(value = "/process-instance/{id}", method = RequestMethod.DELETE)
	public void deleteProcessInstance(@PathVariable("id") String id) {
		restTemplate.delete(env.getProperty("camunda.rest.base.url") + "/process-instance/" + id);
	}

}
