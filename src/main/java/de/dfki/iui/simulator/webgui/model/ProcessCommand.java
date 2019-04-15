package de.dfki.iui.simulator.webgui.model;

import java.util.Date;


public abstract class ProcessCommand {

    private Date timeStamp;
    private String processInstanceId;
    protected ProcessCommandTypes type;
    
	public Date getTimeStamp() {
		return timeStamp;
	}
	
	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}
	
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public ProcessCommandTypes getType() {
		return type;
	}

    
}
