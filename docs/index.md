# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).


```python
a = 1
b = 2
```

<div>
<marimo-button>

```python
def hello_world():
    print("Hello, World!")

hello_world()
```
</marimo-button>
</div>

It's also possible to replace a code block with an inlined notebook.

<div>
<marimo-iframe>

```python
def hello_world():
    print("Hello, World! from an iframe!")

hello_world()
```
</marimo-iframe>
</div>

Multiple code blocks will be replaced with an entire notebook.

<div>
<marimo-iframe>

```python
import marimo as mo
```

```python
slider = mo.ui.slider(1, 10)
slider
```

```python
slider.value * "🍃"
```
</marimo-iframe>
</div>

<!-- Optionally configure how buttons and iframes are rendered. -->
<!-- Configuration must come _before_ the main extractor script is loaded. -->
<script type="text/x-codesend-config">
configureMarimoButtons({title: "Open in a marimo notebook"});
configureMarimoIframes({height: "400px"});
</script>
<script src="extractor.js"></script>
