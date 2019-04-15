package de.dfki.iui.simulator.webgui.model;

import java.util.HashMap;
import java.util.Map;

public class ManualCommand extends ProcessCommand {


	private String processName;
	private String processVersion;
	private String operation;
	private String workerId;
	
	private Map<String, String> environment = new HashMap<>();

	public ManualCommand() {
		this.type = ProcessCommandTypes.MANUAL;
	}
	
	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public String getProcessVersion() {
		return processVersion;
	}

	public void setProcessVersion(String processVersion) {
		this.processVersion = processVersion;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getWorkerId() {
		return workerId;
	}

	public void setWorkerId(String workerId) {
		this.workerId = workerId;
	}

	public Map<String, String> getEnvironment() {
		return environment;
	}

	public void setEnvironment(Map<String, String> environment) {
		this.environment = environment;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((environment == null) ? 0 : environment.hashCode());
		result = prime * result + ((operation == null) ? 0 : operation.hashCode());
		result = prime * result + ((processName == null) ? 0 : processName.hashCode());
		result = prime * result + ((processVersion == null) ? 0 : processVersion.hashCode());
		result = prime * result + ((workerId == null) ? 0 : workerId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ManualCommand other = (ManualCommand) obj;
		if (environment == null) {
			if (other.environment != null)
				return false;
		} else if (!environment.equals(other.environment))
			return false;
		if (operation == null) {
			if (other.operation != null)
				return false;
		} else if (!operation.equals(other.operation))
			return false;
		if (processName == null) {
			if (other.processName != null)
				return false;
		} else if (!processName.equals(other.processName))
			return false;
		if (processVersion == null) {
			if (other.processVersion != null)
				return false;
		} else if (!processVersion.equals(other.processVersion))
			return false;
		if (workerId == null) {
			if (other.workerId != null)
				return false;
		} else if (!workerId.equals(other.workerId))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ManualCommand [processName=" + processName + ", processVersion=" + processVersion + ", operation="
				+ operation + ", workerId=" + workerId + ", environment=" + environment + "]";
	}

	
}
