package de.dfki.iui.simulator.webgui.model;

public class ConfirmCommand extends ProcessCommand {

	private String unitId;
	private String event;
	
	public ConfirmCommand() {
		this.type = ProcessCommandTypes.ACKNOWLEDGE;
	}

	public String getUnitId() {
		return unitId;
	}

	public void setUnitId(String unitId) {
		this.unitId = unitId;
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((event == null) ? 0 : event.hashCode());
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
		ConfirmCommand other = (ConfirmCommand) obj;
		if (event == null) {
			if (other.event != null)
				return false;
		} else if (!event.equals(other.event))
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
		return "ConfirmCommand [unitId=" + unitId + ", event=" + event + "]";
	}
	
}

