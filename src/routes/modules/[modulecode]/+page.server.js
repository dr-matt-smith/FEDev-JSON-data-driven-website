import { error } from '@sveltejs/kit';
const endpoint = "http://localhost:3000/modules";

export const load = async ({ params }) => {
    let moduleCode = params.modulecode;

    // add module code ID to end of API GET URL
    const response = await fetch(endpoint + "/" + moduleCode);
    const module = await response.json();

    // check if we got a module object back or not
    const title = module.title;

    // if module object underfined, we didn't find one,
    // so generate a 404 NOT FOUND redirect
    if (!title) error(404);

    return {
        moduleCode,
        module
    };
}
