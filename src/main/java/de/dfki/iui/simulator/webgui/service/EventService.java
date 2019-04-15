package de.dfki.iui.simulator.webgui.service;

import java.util.List;

import de.dfki.iui.simulator.webgui.model.ProcessCommand;

public interface EventService {

	List<ProcessCommand> getEvents();
	
	List<ProcessCommand> getEventsForProcessInstance(String id);

	void addEvent(ProcessCommand event);
	
}
