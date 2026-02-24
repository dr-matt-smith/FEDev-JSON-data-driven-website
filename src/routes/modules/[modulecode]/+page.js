import { error } from '@sveltejs/kit';
import { modules } from '$lib/data/modules.js';

export function load({ params }) {
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
