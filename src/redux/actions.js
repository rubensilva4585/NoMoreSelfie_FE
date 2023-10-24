export const login = (token, id, name, role, avatar) => ({
        type: 'LOGIN',
        token,
        id,
        name,
        role,
        avatar,
});

export const logout = () => ({
        type: 'LOGOUT',
});