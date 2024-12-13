
export const getToken = () => {
    return window.localStorage.getItem(`nutri_token`);
}

export const setToken = (token: string) => {
    return `${window.localStorage.setItem(`nutri_token`, token)}`;
}

export const deleteTokenAndUser = () => {
    window.localStorage.removeItem(`nutri_token`);
    window.localStorage.removeItem(`user`);
}

