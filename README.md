### codesend

> JS snippet to send codeblock contents as a query string

## Usage 

This approach expects an HTML comment above a codeblock to work.

Here is one example: 

````md
# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).


```python
a = 1
b = 2
```

<!-- url-copy: https://python.playground.com param-name: source -->
```python
def hello_world():
    print("Hello, World!")
```

<script src="extractor.js"></script>
````

Notice how the first codeblock does not have a comment but the second one does? 