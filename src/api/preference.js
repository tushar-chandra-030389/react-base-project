export const fetchPreference = async (id) => {
    const result = await new Promise((resolve, reject) =>  {
        setTimeout(() => resolve({theme: 'dark'}), 2000);
    });
    return result;
};

export const fetchModules = async (id) => {
    const result = await new Promise((resolve, reject) =>  {
        setTimeout(() => resolve([
            { name: 'M1', admin: true },
            { name: 'M2', admin: true },
            { name: 'M3', admin: false },
            { name: 'M4', admin: false },
        ]), 2000);
    });
    return result;
};