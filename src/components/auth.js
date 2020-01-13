class Auth {
    constructor(){
        // this.authenticated = false
    }

    Login(cb) {
        // this.authenticated = true
        localStorage.setItem("token", "qwrzkituUzxcgpasdjqwrnOasdmr5iAMS")
        cb()
    }

    Logout(cb) {
        // this.authenticated = false
        localStorage.removeItem("token")
        cb()
    }

    isAuthenticated() {
        return this.authenticated
    }
}

export default new Auth()