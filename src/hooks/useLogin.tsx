import axios from "axios";

export function useLogin() {
    async function checkAuth() {
        let auth = false;
        await axios
            .get('http://localhost:3001/users/isAuth')
            .then((res) => {
                console.log(res);
                auth = true;
            })
            .catch((err) => {
                console.log(err);
            });
        return auth;
    } 
    async function login(username: string, password: string) {
        let auth = false;
        await axios.post('http://localhost:3001/users/login', {
            username: username,
            password: password
        }).then((res) => {
            console.log(res);
            auth = true;
        }).catch((err) => {
            console.log(err);
        });
        return auth;
    }
    async function logout() {
        await axios.post('http://localhost:3001/users/logout').catch((err) => {
            console.log(err);
        });
    }

    return { checkAuth, login, logout };
}

