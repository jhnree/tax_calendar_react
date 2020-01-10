class Auth {
    constructor(){
        this.authenticated = false
    }

    Login(cb) {
        this.authenticated = true
        cb()
    }

    Logout(cb) {
        this.authenticated = false
        cb()
    }

    isAuthenticated() {
        return this.authenticated
    }
}

export default new Auth()