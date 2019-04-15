package de.dfki.iui.simulator.webgui.controller.rest;

import java.net.URI;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/rest")
public class CamundaHistoryRESTController {

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private Environment env;
	
	@RequestMapping("/history/activity-instance")
	public Object queryActivityInstanceHistory(@RequestParam Map<String, String> allRequestParams) {
		UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
				.fromUriString(env.getProperty("camunda.rest.base.url")).path("/history/activity-instance");

		allRequestParams.forEach(targetUrlBuilder::queryParam);

		URI targetUrl = targetUrlBuilder.build().encode().toUri();

		return restTemplate.getForObject(targetUrl.toString(), Object.class);
	}

	@RequestMapping("/history/incident")
	public Object getIncidentHistory(@RequestParam Map<String, String> allRequestParams) {
		UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
				.fromUriString(env.getProperty("camunda.rest.base.url")).path("/history/incident");

		allRequestParams.forEach(targetUrlBuilder::queryParam);

		URI targetUrl = targetUrlBuilder.build().encode().toUri();

		return restTemplate.getForObject(targetUrl.toString(), Object.class);
	}
	
	@RequestMapping("/history/variable-instance")
	public Object queryVariableInstanceHistory(@RequestParam Map<String, String> allRequestParams) {
		UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
				.fromUriString(env.getProperty("camunda.rest.base.url")).path("/history/variable-instance");

		allRequestParams.forEach(targetUrlBuilder::queryParam);

		URI targetUrl = targetUrlBuilder.build().encode().toUri();

		return restTemplate.getForObject(targetUrl.toString(), Object.class);
	}
	
	@RequestMapping("/history/process-instance")
	public Object queryProcessInstance(@RequestParam Map<String, String> allRequestParams) {
		UriComponentsBuilder targetUrlBuilder = UriComponentsBuilder
				.fromUriString(env.getProperty("camunda.rest.base.url")).path("/history/process-instance");

		allRequestParams.forEach(targetUrlBuilder::queryParam);

		URI targetUrl = targetUrlBuilder.build().encode().toUri();

		return restTemplate.getForObject(targetUrl.toString(), Object.class);
	}
	
}
