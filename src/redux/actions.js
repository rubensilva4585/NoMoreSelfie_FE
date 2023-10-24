export const login = (token, id, name, role) => ({
        type: 'LOGIN',
        token,
        id,
        name,
        role,
});

export const logout = () => ({
        type: 'LOGOUT',
});