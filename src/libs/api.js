export const getData = async(resource, options = {}) => {
    const { headers, query } = options
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`, {
        headers,
    });
    const data = await response.json()
    return data
}

export const putData = async (resource, options = {}) => {
    const { headers, query, method, body } = options;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });
    const data = await response.json()
    return data
}
