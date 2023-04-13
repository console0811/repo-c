export class ScholarshipOptionsModel {
  constructor() {
    this.search = null
    this.page = 1
    this.dialog = false
    this.valid = false
    this.mode = ""
    this.types = []
    this.length = 0
  }
}

export default class ScholarshipModel {
  constructor({
    title = "",
    type = "",
    descriptions = "",
    qualifications = "",
    requirements = "",
    responsibilities = "",
    date = "",
    limit = 0,
    createdBy = "",
    lastModified = "",
    cutOff = "",
    status = "active",
    markerLatLng = [],
  } = {}) {
    this.title = title,
      this.type = type;
    this.cutOff = cutOff;
    this.descriptions = descriptions;
    this.qualifications = qualifications;
    this.requirements = requirements;
    this.responsibilities = responsibilities;
    this.date = date;
    this.limit = limit;
    this.createdBy = createdBy;
    this.lastModified = lastModified;
    this.status = status;
    this.markerLatLng = markerLatLng;
  }
}
