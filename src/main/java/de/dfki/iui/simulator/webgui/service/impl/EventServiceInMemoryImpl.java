package de.dfki.iui.simulator.webgui.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import de.dfki.iui.simulator.webgui.model.ProcessCommand;
import de.dfki.iui.simulator.webgui.service.EventService;

@Service
public class EventServiceInMemoryImpl implements EventService {


    private List<ProcessCommand> events = new LinkedList<>();

    @Override
    public List<ProcessCommand> getEvents() {
        return events;
    }

    @Override
    public List<ProcessCommand> getEventsForProcessInstance(String id) {
        return events.stream().filter(e ->
                e.getProcessInstanceId().equals(id)
        ).collect(Collectors.toList());
    }

    @Override
    public void addEvent(ProcessCommand event) {
        events.add(event);
    }

}
