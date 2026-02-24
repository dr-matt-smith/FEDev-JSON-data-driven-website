const endpoint = "http://localhost:3000/modules";

export const load = async ({ params }) => {
    const response = await fetch(endpoint);
    const modules = await response.json();

    return { modules };
};
