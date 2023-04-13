export class ScholarshipOptionsModel {
    constructor() {
        this.search = null
        this.page = 1
        this.dialog = false
        this.valid = false
        this.mode = ""
        this.courses = []
        this.length = 0
    }
}

export default class ScholarshipModel {
    constructor({
        course = "",
        descriptions = "",
        date = "",
        limit = 0,
        createdBy = "",
        lastModified = "",
        cutOff = "",
        status = "active"
    } = {}) {
        this.course = course;
        this.cutOff = cutOff;
        this.descriptions = descriptions;
        this.date = date;
        this.limit = limit;
        this.createdBy = createdBy;
        this.lastModified = lastModified;
        this.status = status;
    }
}