# marimo snippets

Example usage of [marimo snippets](https://github.com/marimo-team/marimo-snippets),
with mkdocs.

marimo snippets lets you selectively render Python code snippets as notebooks,
or add buttons to snippets that link out to notebooks.

## Initialize marimo snippets

Include the following to load marimo snippets on your web page:

```html
<!-- Optionally configure how buttons and iframes are rendered. -->
<!-- Configuration must come _before_ the main extractor script is loaded. -->
<script type="text/x-marimo-snippets-config">
configureMarimoButtons({title: "Open in a marimo notebook"});
configureMarimoIframes({height: "400px"});
</script>
<script src="https://cdn.jsdelivr.net/npm/@marimo-team/marimo-snippets@1.0.0/src/extractor.js"></script>
```

## Linking to notebooks

Use `<marimo-button>` to link out to a notebook:

````md
<div>
<marimo-button>
```python
def hello_world():
    print("Hello, World!")

hello_world()
```
</marimo-button>
</div>
````

renders as

<div>
<marimo-button>
```python
def hello_world():
    print("Hello, World!")

hello_world()
```
</marimo-button>
</div>

## Embedding notebooks inline

It's also possible to replace a code block with an inlined notebook,
using `<marimo-iframe>`:

````md
<div>
<marimo-iframe>
```python
def hello_world():
    print("Hello, World!")

hello_world()
```
</marimo-iframe>
</div>
````

renders as

<div>
<marimo-iframe>
```python
def hello_world():
    print("Hello, World!")

hello_world()
```
</marimo-iframe>
</div>

Multiple code blocks will be replaced with an entire notebook:

````md
<div>
<marimo-iframe data-height="600px">

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
````

renders as

<div>
<marimo-iframe data-height="600px">

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
<script type="text/x-marimo-snippets-config">
configureMarimoButtons({title: "Open in a marimo notebook"});
configureMarimoIframes({height: "400px"});
</script>
<script src="https://cdn.jsdelivr.net/npm/@marimo-team/marimo-snippets@1.0.0/src/extractor.js"></script>
