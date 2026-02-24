# Progressive module details website

A module details website. Routing in the form `/module/H2037`


What is a "slug"
- https://yoast.com/slug/
- a user-friendly ID
- objects from DB have a natural ID
- things like blog posts can have slug IDs created by connecting words with hypens, e.g. "university-hands-out-free-burgers"

for this project we'll refer to module code
- but often you'll see a generic `/routes/blog/[slug]/+page.svelte` pattern ...

## Step 1: create home page and a modules list page with links to 3 modules `/routes/+page.svelte`

![all module routes get same placholder messsage](/screenshots/1_module_links.png)


Make the website home page `/routes/+page.svelte` provide links to 3 modules:
- H2037 Front End Dev
- H2019 Database Fundamentals
- H2031 Object-Oriented Programming

We'll use the "H" codes as the IDs/slugs:
- `/modules/h2027`
- `/modules/H2019`
- `/modules/H2031`

here's the code for the simple home page: `/routes/+page.svelte`
```html
<script>
</script>

<h1>MGW - my great website</h1>

<p>learn more about:</p>

<ul>
    <li>Degree programmes (coming soon)</li>
    <li>Evening classes (coming soon)</li>
    <li><a href="/modules">modules</a></li>
</ul>
```

Create folder `/routes/modules`

here's the code for the modules list page `/routes/modules/+page.svelte`
```html
<h1>Welcome to Modulesite</h1>

Learn more about year 2 modules
<ul>
    <li>
        <a href="/modules/h2027">H2037 Front End Dev</a>
    </li>
    <li>
        <a href="/modules/h2019">H2019 Database Fundamentals</a>
    </li>
    <li>
        <a href="/modules/h2031">H2031 Object-Oriented Programming</a>
    </li>
</ul>
```

## Step 2: create our placeholder module details page `/routes/modules/[modulecode]/+page.svelte`

![module details coming soon](/screenshots/3_module_coming_soon.png)

Create folder `/routes/modules/[modulecode]` 
- yes include the square brackets in directory name!

Create file `/routes/modules/[modulecode]/+page.svelte` containing a coming-soon message:
```html
<p>
    module coming soon
    <br>
    <a href="/">
        &lt;-  back to home page
    </a>
</p>
```

Now, reglardless of the value in the HTTP Request URL after `/modules/` the user will see the same placeholder page content.

## Step 3: extract the module code from the HTTP Request params

![module code extracted as as a heading](/screenshots/2_slug_extracted.png)

We can add a bit more to our catch-all module details page, to capture the module code from the URl

In `/routes/modules/[modulecode]/+page.svelte` we need to access the HTTP Request parameters...

We can use the `export let params` statement to get access to the HTTP Request parameter data.
- in out HTML code of the Svelte page we can then use `{params.modulecode}` to extract the route parameter `modulecode`


Update script `/routes/modules/[modulecode]/+page.svelte` to the following:

```html
<script>
    export let params;
</script>

<h1>
    You are looking for details of {params.modulecode}
</h1>

<p>
    module coming soon
    <br>
    <a href="/">
        &lt;-  back to home page
    </a>
</p>
```

We could be a bit more organised, and put the code into its own variable `moduleCode`:

`/routes/modules/[modulecode]/+page.svelte`
```html
<script>
    export let params;
    let moduleCode = params.modulecode
</script>

<h1>
    You are looking for details of {moduleCode}
</h1>

<p>
    module coming soon
    <br>
        <a href="/">
            &lt;-  back to home page
        </a>
</p>
```



## Step 4: Use "IF" statement to customise the module details page

![custom module content](/screenshots/4_customer_content.png)

Since we only have 3 modules to deal with, let's hard-code responses to each of the 3 module codes.

NOTE: This would be a very poor approach for any larger number of modules!

We make use of the IF -ELSE IF - ELSE blocks of the Svelte framework
- note the different characters for the beggining `#`, middle `:` and end `/` of the blocks
```html
{#if <condition1>}
    content for condition 2
{:else if <condition2>}
    content for condition 2
{:else}
    default content
{/if}
```

Update script `/routes/modules/[modulecode]/+page.svelte` to the following:
```html
<script>
    export let params;
    let moduleCode = params.modulecode
</script>

<nav>
    <a href="/">home</a>
    |
    <a href="/modules">module list</a>
</nav>
<br>

<h1>
    Details of module with code = {moduleCode}
</h1>

{#if moduleCode == "h2027"}
    <h3>COMP H2027 Front End Development</h3>
    <p>
        learn about Svelte and SvelteKit for dynamic website development
    </p>
{:else if moduleCode == "h1029"}
    <h3>COMP H1029 Database Fundamentals</h3>
    <p>
        learn database stuff
    </p>
{:else if moduleCode == "h2031"}
    <h3>H2031 Object-Oriented Programming</h3>
    <p>
        learn OO Java programming stuff
    </p>
{:else}
    <p>ERROR - unknown module code</p>
{/if}
```


## Step 5: Move logic into the JavaScript section of the Svelte page

Rather than doing the logic in the HTML content section, let's move the logic into the JavaScript part of our script, so that our HTML content is as simple as outputting the contents of JavaScript variables `moduleTitle` and `moduleDetails`.

This approach is good preparation for when the title and details come from a JSON data source, rather than being hard coded.

Again, we are trying to ensure that the main job of our Svelte page is to decorate data with HTML and CSS
- we'll move the decision logic out of this page in a later step....

Update script `/routes/modules/[modulecode]/+page.svelte` to the following:
```html
<script>
    export let params;
    let moduleCode = params.modulecode;

    // default to unknown module code
    let moduleTitle = "ERROR";
    let moduleDetails = "unknown module code";

    if(moduleCode === "h2027") {
        moduleTitle = "COMP H2027 Front End Development";
        moduleDetails = "learn about Svelte and SvelteKit for dynamic website development"
    }

    if(moduleCode === "h1029") {
        moduleTitle = "COMP H1029 Database Fundamentals";
        moduleDetails = "learn database stuff"
    }

    if(moduleCode === "h2031") {
        moduleTitle = "COMP H2031 Object-Oriented Programming";
        moduleDetails = "learn OO Java programming stuff"
    }

</script>

<nav>
    <a href="/">home</a>
    |
    <a href="/modules">module list</a>
</nav>
<br>

<h1>
    Details of module with code = {moduleCode}
</h1>

<h3>{moduleTitle}</h3>
<p>
    {moduleDetails}
</p>
```

## Step 6: Have an JSON array of module details, and search to find module matching URL module code

Let's generalise our `/routes/modules/[modulecode]/+page.svelte` code, to allow for data about many modules, that might come form some data source such as a Database or API. 

So let's encode the data for our three modules as objects in a JSON array:

```javascript
const modules = [
    {
        id: "h2027",
        title: "H2027 Front End Development",
        details: "learn about Svelte and SvelteKit for dynamic website development"
    },
    {
        id: "h1029",
        title: "COMP H1029 Database Fundamentals",
        details: "learn about H1029 Database Fundamentals"
    },
    {
        id: "h2031",
        title: "COMP H2031 Object-Oriented Programming",
        details: "learn OO Java programming stuff"
    }
]
```

We can use the JavaScript array `find()` method to attempt to locate a module object whose code matches the module code from the HTTP Request parameters
- if no such module can be found in the array, we can populate a `module` variable with error values

```javascript
// use array find() method to seach for object matching module code from URL
let module = modules.find((module) => module.id === moduleCode);

// if we didn't find a module, then populate with error details
if (!module) {
    module = {
        id: moduleCode,
        title: "ERROR",
        details: "unknown module code"
    };
}
```

So the full listing for `/routes/modules/[modulecode]/+page.svelte`  is now:

```html
<script>
    export let params;
    let moduleCode = params.modulecode;

    // JSON array of module data
    const modules = [
        {
            id: "h2027",
            title: "H2027 Front End Development",
            details: "learn about Svelte and SvelteKit for dynamic website development"
        },
        {
            id: "h1029",
            title: "COMP H1029 Database Fundamentals",
            details: "learn about H1029 Database Fundamentals"
        },
        {
            id: "h2031",
            title: "COMP H2031 Object-Oriented Programming",
            details: "learn OO Java programming stuff"
        }
    ];

    // use array find() method to seach for object matching module code from URL
    let module = modules.find((module) => module.id === moduleCode);

    // if we didn't find a module, then populate with error details
    if (!module) {
        module = {
            id: moduleCode,
            title: "ERROR",
            details: "unknown module code"
        };
    }

</script>

<nav>
    <a href="/">home</a>
    |
    <a href="/modules">module list</a>
</nav>
<br>

<h1>
    Details of module with code = {module.id}
</h1>

<h3>{module.title}</h3>
<p>
    {module.details}
</p>
```

## Step 7: Move our JSON data array into a different script

Let's create a new JavaScript file declaring the JSON module object array.

Create directory `/lib/data`, and create file `/lib/data/modules.js` containing our JSON array declaration:

```javascript
// file: /lib/data/modules.js

// JSON array of module data
const modules = [
    {
        id: "h2027",
        title: "H2027 Front End Development",
        details: "learn about Svelte and SvelteKit for dynamic website development"
    },
    {
        id: "h1029",
        title: "COMP H1029 Database Fundamentals",
        details: "learn about H1029 Database Fundamentals"
    },
    {
        id: "h2031",
        title: "COMP H2031 Object-Oriented Programming",
        details: "learn OO Java programming stuff"
    }
];
```

In any Svelte script we can access this data with an `import` statement:
```javascript
    import { modules } from '$lib/data/modules.js';
```

So we can simplify our Svelte page  `/routes/modules/[modulecode]/+page.svelte`  to the following:

```html
<script>
    export let params;
    let moduleCode = params.modulecode;

    import { modules } from '$lib/data/modules.js';

    // use array find() method to seach for object matching module code from URL
    let module = modules.find((module) => module.id === moduleCode);

    // if we didn't find a module, then populate with error details
    if (!module) {
        module = {
            id: moduleCode,
            title: "ERROR",
            details: "unknown module code"
        };
    }
</script>

<nav>
    <a href="/">home</a>
    |
    <a href="/modules">module list</a>
</nav>
<br>

<h1>
    Details of module with code = {module.id}
</h1>

<h3>{module.title}</h3>
<p>
    {module.details}
</p>
```


## Step 8: Creating our list of modules from the JSON array

Since we've easy access to the JSON array of modules, let's remove the hard-coding of module links in our module list page, and create those links by looping through the module objects.

We can use a Svele `each` loop, to loop through each module object and display its properties. The general structure of a Svelte `each` loop is as follows:
```html
    {#each arrayName as objectName}
        --do things with objectName.field here--
        e.g. <p>{module.title}</p>
    {:else}
        output if array is empty
        e.g. <p>sorry - I couldn't dind any blog posts to dislay</p> 
    {/each}
```

Our array is named `modules`, so we'll use the singular in our `each` loop: 
```html
    {#each modules as module}
    <li>
        <a href="/modules/{module.id}">{module.title}</a>
    </li>
    {:else}
    <li>
        ERROR - no modules found to list here !
    </li>
    {/each}
```

Update page `/routes/modules/+page.svelte`: as follows:

```html
<script>
    import { modules } from '$lib/data/modules.js';
</script>

<nav>
    <a href="/">home</a>
    |
    <a href="/modules">module list</a>
</nav>
<br>

<h1>Welcome to Modulesite</h1>

<p>Learn more about year 2 modules</p>
<ul>
    {#each modules as module}
    <li>
        <a href="/modules/{module.id}">{module.title}</a>
    </li>
    {:else}
    <li>
        ERROR - no modules found to list here !
    </li>
    {/each}
</ul>
```


## Step 9: JavaScript server `load()` function

The SvelteKit documentations pages (https://svelte.dev/tutorial/kit/page-data) say that there are 3 core responsibilities:

1. Routing
   - figuring out which route matchs the received HTTP Request
1. Loading
   - loading the appropriate data for the requested route
1. Rendering
   - generating HTML/CSS (and/or perhaps updating the DOM)

We've been doing the data loading in teh `<script>` part of our Svelte pages. However, SveltKit best practice says that we should be creating JavaScript `+page.server.js` files, to load the appropraite data for each route.

We have 2 routes needed data:
- `/modules`
- `/modules/[moduleCode]`

So we should have 2 `+page.server.js` files:
- `/modules/+page.server.js`
- `/modules/[moduleCode]/+page.server.js`

So, first, let's load our list of modules for the module list page using a new script `/modules/+page.server.js`:

```javascript
import { modules } from '$lib/data/modules.js';

export function load() {
    return {
        modules
    };
}
```

This script loads the JSON data from `$lib/data/modules.js`, and then declares a `load()` function to pass on that array of module objects to our Svelte page.

We can now refactor our module list Svelte page (`/modules/+page.svelt`) as follows:


```html
<script>
    let { data } = $props();
    let modules = data.modules;
</script>

<nav>
    <a href="/">home</a>
    |
    <a href="/modules">module list</a>
</nav>
<br>

<h1>Welcome to Modulesite</h1>

<p>Learn more about year 2 modules</p>
<ul>
    {#each modules as module}
    <li>
        <a href="/modules/{module.id}">{module.title}</a>
    </li>
    {:else}
    <li>
        ERROR - no modules found to list here !
    </li>
    {/each}
</ul>
```

As we can see, we read in the data from the JavaScript `load()` function by writing `let { data } = $props();`. We can then access the data items loaded from the `data` object. So our array of modules is `data.modules`,

Otherwise this module list page is much the same.

However, when it comes to the individual module details page, we can more more responsibility to our JavaScript server page. Create a new file `/modules/[moduleCode]/+page.server.js` as follows:

```javascript
import { modules } from '$lib/data/modules.js';

export function load({ params }) {
    let moduleCode = params.modulecode;

    const module = modules.find(module =>
        module.id === moduleCode
    );

    return {
        moduleCode,
        module
    };
}
```

Above we get the JSON modules array from `$lib/data/modules.js`, then extract the module code from the Request URL, then search to find a module object whose `id` matchjes the module code from the URL. Finally, this `load()` function returns 2 pieces of data, the moduleCode, and a module object.

Since we've done the searching in our JavaScript server script, the code for our module details Svelte page (`/modules/[moduleCode]/+page.svelte`) is a bit simpler:

```html
<script>
    let { data } = $props();
    let moduleCode = data.moduleCode;
    let module = data.module;

    // if we didn't find a module, then populate with error details
    if (!module) {
        module = {
            id: moduleCode,
            title: "ERROR",
            details: "unknown module code"
        };
    }
</script>

<nav>
    <a href="/">home</a>
    |
    <a href="/modules">module list</a>
</nav>
<br>

    <h1>
        Details of module with code = {module.id}
    </h1>

    <h3>{module.title}</h3>
    <p>
        {module.details}
    </p>
```

## Step 10: JavaScript server 404 page redirect

![404 Not found page for bad module ID](/screenshots/5_not_found_404_page.png)

We can further simplify our module details page, so assume that it will only be used to render a page if a module was successfully found.

We can make this assumption, since in our module details JavaScript server page, we can test to see if a module was NOT found, and if so, geneate a 404 Not Found error page.

Let's add this check and 404 redirect to our module details JavaScript server page (`/modules/[moduleCode]/+page.server.js`):

```javascript
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
```

This means the code for our module details Svelte page (`/modules/[moduleCode]/+page.svelte`) is much simpler, since we don't have to check whether a module object is undefined or not. We just get the module object

```html
<script>
    let { data } = $props();
    let module = data.module;
</script>

<nav>
    <a href="/">home</a>
    |
    <a href="/modules">module list</a>
</nav>
<br>

<h1>
    Details of module with code = {module.id}
</h1>

<h3>{module.title}</h3>
<p>
    {module.details}
</p>
```
