package de.dfki.iui.simulator.webgui.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/rest")
public class CamundaDecisionDefinitionRESTController {

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private Environment env;
	
	@RequestMapping("decision-definition/count")
	public Object getDecisionDefinitionCount() {
		return restTemplate.getForObject(env.getProperty("camunda.rest.base.url") + "/decision-definition/count", Object.class);
	}
}
