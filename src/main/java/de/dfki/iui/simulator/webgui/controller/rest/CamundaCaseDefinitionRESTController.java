package de.dfki.iui.simulator.webgui.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/rest")
public class CamundaCaseDefinitionRESTController {

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private Environment env;
	
	@RequestMapping("case-definition/count")
	public Object getCaseDefinitionCount() {
		return restTemplate.getForObject(env.getProperty("camunda.rest.base.url") + "/case-definition/count", Object.class);
	}
	
}
