const dbURL = import.meta.env.VITE_BACKEND_API_URL;

type FetcherOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: HeadersInit;
};

export async function fetcher(url: string, options: FetcherOptions = {}) {
    const { method = 'GET', body, headers } = options;

    try {
        const response = await fetch(`${dbURL}/${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: method !== 'GET' ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        return data;
    } catch (error: any) {
        console.error("Error in fetcher:", error.message);
        throw error;
    }
}
