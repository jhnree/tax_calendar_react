class Auth {
    Login(cb) {
        localStorage.setItem("token", "qwrzkituUzxcgpasdjqwrnOasdmr5iAMS")
        cb()
    }

    Logout(cb) {
        localStorage.clear()
        sessionStorage.clear()
        cb()
    }

    isAuthenticated() {
        return this.authenticated
    }
}

export default new Auth()