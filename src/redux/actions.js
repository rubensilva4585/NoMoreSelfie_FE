export const login = (token, id, name, role, avatar) => ({
        type: 'LOGIN',
        token,
        id,
        name,
        role,
        avatar,
});

export const update = (name, role, avatar) => ({
        type: 'UPDATE',
        name,
        role,
        avatar,
});

export const updateAvatar = (avatar) => ({
        type: 'UPDATE_AVATAR',
        avatar,
});

export const logout = () => ({
        type: 'LOGOUT',
});