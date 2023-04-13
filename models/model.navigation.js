class RouteModel {
  constructor({ text = "", name = "", icon = "", params = {} } = {}) {
    this.text = text;
    this.name = name;
    this.params = params;
    this.icon = icon;
  }
}

export default class NavigationModel {
  constructor({ role = "" } = {}) {
    this.role = role;
    this.routes = [
      new RouteModel({ text: "home", name: "home", icon: "mdi-home" }),
      new RouteModel({
        text: "profile",
        name: "profile",
        icon: "mdi-account",
      }),
      new RouteModel({
        text: "dashboard",
        name: "dashboard-type",
        icon: "mdi-monitor-dashboard",
        params: { type: role },
      }),
      new RouteModel({
        text: "scholarships",
        name: "scholarships",
        icon: "mdi-view-list",
      }),
    ];

    if (role == "admin") {
      this.routes.push(
        new RouteModel({
          text: "user-management",
          name: "user-management-status",
          params: { status: 'pending' },
          icon: "mdi-email-open",
        })
      );
    }

    if (role == "applicant") {
      this.routes = this.routes.filter(i => i.name !== "dashboard-type")
    }
  }
}
