export const setStorage = (typeStorage: string, value: string) => {
    if (typeStorage) {
        switch (typeStorage) {
            case 'token':
                window.localStorage.setItem('token', value);
                break;
            case 'id':
                window.localStorage.setItem('id', value);
                break;
            case 'auth':
                window.localStorage.setItem('auth', value);
                break;
            case 'permission':
                window.localStorage.setItem('permission', value);
                break;
        }
    }
}

export const getStorage = (getValue: string) => {
    const storage = window.localStorage.getItem(getValue);
    return storage;
}

export const clearStorage = () => {
    window.localStorage.clear();
}