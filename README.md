### codesend

> JS snippet to send codeblock contents as a query string

## Usage 

This approach expects an HTML comment above a codeblock to work.

Here is one example: 

````md
This is a demo site.

```python
a = 1
b = 2
```

<!-- url-copy: https://marimo.app param-name: code -->
```python
def hello_world():
    print("Hello, World!")
```

<script src="extractor.js"></script>
````

<!-- url-copy: https://marimo.app param-name: code -->
```python
def hello_world():
    print("Hello, World!")
```

Notice how the first codeblock does not have a comment but the second one does? The second codeblock will get an extra button added to it that will send the code to the specified URL as a query string.

To run this locally, you only need mkdocs. 

```bash
uv run --with mkdocs-material mkdocs serve
```
