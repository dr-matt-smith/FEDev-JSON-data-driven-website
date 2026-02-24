import { error } from '@sveltejs/kit';
const endpoint = "http://localhost:3000/modules";

export const load = async ({ params }) => {
    // get all modukles
    const response = await fetch(endpoint);
    const modules = await response.json();

    let moduleCode = params.modulecode;

    const module = modules.find(module =>
        module.id === moduleCode
    );

    // if module object underfined, we didn't find one,
    // so generate a 404 NOT FOUND redirect
    if (!module) error(404);

    return {
        moduleCode,
        module
    };
}
