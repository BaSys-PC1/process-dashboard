package de.dfki.iui.simulator.webgui.model;

import java.util.HashMap;
import java.util.Map;

public class AutomaticCommand extends ProcessCommand {

	private String processName;
	private String processVersion;
	private String operation;
	private String unitId;
	private Map<String,String> config = new HashMap<>();

	public AutomaticCommand() {
		this.type = ProcessCommandTypes.AUTOMATIC;
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

	public String getUnitId() {
		return unitId;
	}

	public void setUnitId(String unitId) {
		this.unitId = unitId;
	}

	public Map<String, String> getConfig() {
		return config;
	}

	public void setConfig(Map<String, String> config) {
		this.config = config;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((config == null) ? 0 : config.hashCode());
		result = prime * result + ((operation == null) ? 0 : operation.hashCode());
		result = prime * result + ((processName == null) ? 0 : processName.hashCode());
		result = prime * result + ((processVersion == null) ? 0 : processVersion.hashCode());
		result = prime * result + ((unitId == null) ? 0 : unitId.hashCode());
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
		AutomaticCommand other = (AutomaticCommand) obj;
		if (config == null) {
			if (other.config != null)
				return false;
		} else if (!config.equals(other.config))
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
		if (unitId == null) {
			if (other.unitId != null)
				return false;
		} else if (!unitId.equals(other.unitId))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AutomaticCommand [processName=" + processName + ", processVersion=" + processVersion + ", operation="
				+ operation + ", unitId=" + unitId + ", config=" + config + "]";
	}
	
	
}
