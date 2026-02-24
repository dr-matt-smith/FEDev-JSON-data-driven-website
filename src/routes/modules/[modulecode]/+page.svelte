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