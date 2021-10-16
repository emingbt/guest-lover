Traveler = class {
    constructor(name, age) {
        this.name = name,
        this.age = age,
        this.requestActive = [],
        this.requestPast = []
    }

    addHome(location) {
        this.home = new Home(this, location)
    }

    openHomeForTravelers() {
        this.home.viewable = true
    }

    closeHomeForTravelers() {
        this.home.viewable = false
    }

    sendRequest(traveler) {
        this.requestActive.push([traveler.home, undefined])
        traveler.requestActive.push(this)
    }

    replyRequest(traveler, answer) {
        if (answer) {
            this.requestPast.push([traveler, true])
            traveler.requestPast.push([this.home, true])
        }
        else {
            this.requestPast.push([traveler, false])
            traveler.requestPast.push([this.home, false])
        }
    }
}

Home = class {
    constructor(owner, location) {
        this.owner = owner,
        this.location = location,
        this.viewable = false
    }
}