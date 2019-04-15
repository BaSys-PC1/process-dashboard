package de.dfki.iui.simulator.webgui.controller.rest;

import java.net.URI;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/rest")
public class CamundaVariableInstanceRESTController {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private Environment env;

	@RequestMapping("/variable-instance")
	public Object queryVariableInstance(@RequestParam Map<String, String> allRequestParams) {
		UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
				.fromUriString(env.getProperty("camunda.rest.base.url")).path("/variable-instance");

		allRequestParams.forEach((k, v) -> {
			targetUrlBuilder.queryParam(k, v);
		});

		URI targetUrl = targetUrlBuilder.build().encode().toUri();

		return restTemplate.getForObject(targetUrl.toString(), Object.class);
	}

	@RequestMapping(value = "/variable-instance/{id}")
	public Object getVariableInstance(@PathVariable("id") String id) {
		return restTemplate.getForObject(env.getProperty("camunda.rest.base.url") + "/variable-instance/" + id,
				Object.class);
	}

}
