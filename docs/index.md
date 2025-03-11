# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).


```python
a = 1
b = 2
```

<!-- add-marimo-button -->
```python
def hello_world():
    print("Hello, World!")

hello_world()
```

We might also do something fancy that makes it easy to inline stuff. 

<!-- add-marimo-iframe -->
```python
def hello_world():
    print("Hello, World! from an iframe!")

hello_world()
```

<!-- Optionally configure how buttons and iframes are rendered. -->
<!-- Configuration must come _before_ the main extractor script is loaded. -->
<script type="text/x-codesend-config">
configureMarimoButtons({title: "Open in a marimo notebook"});
configureMarimoIframes({height: "400px"});
</script>
<script src="extractor.js"></script>
