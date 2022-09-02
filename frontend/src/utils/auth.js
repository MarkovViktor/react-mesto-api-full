export const BASE_URL = 'https://api.project15.students.nomoredomains.sbs';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return res.json()
        .then((data) => {
            console.log('возвращаем данные', data)
            throw new Error(data.error);
        });
};

export const register = ({ password, email }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email })
    }).then(checkResponse)
};
export const authorize = ({ password, email }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(checkResponse);

};
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(checkResponse)
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
}