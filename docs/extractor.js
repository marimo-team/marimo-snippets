/**
 * Adds interactive buttons to code blocks that open the code in a Marimo playground
 * @param {string[]} elements - CSS selectors for elements to add buttons to. Default: ['pre', 'div.highlight']
 * @param {Object} settings - Button customization options
 * @param {string} [settings.title='Open code in an interactive playground'] - Button tooltip text
 * @param {string} [settings.position='absolute'] - CSS position property
 * @param {string} [settings.top='0.5rem'] - Distance from top of container
 * @param {string} [settings.right='0.5rem'] - Distance from right of container
 * @param {string} [settings.border='none'] - Button border style
 * @param {string} [settings.borderRadius='4px'] - Button corner radius
 * @param {string} [settings.padding='4px 8px'] - Button padding
 * @param {string} [settings.margin='-4px 22px'] - Button margin
 * @param {string} [settings.cursor='pointer'] - Mouse cursor style on hover
 * @param {string} [settings.zIndex='10'] - Button stacking order
 * @param {string} [settings.filter='grayscale(100%)'] - Default filter applied to button
 * @param {string} [settings.icon='<img src="icon.svg" alt="icon" width="20" height="20">'] - HTML content for the button
 */
function addMarimoButtons(elements = ['pre', 'div.highlight'], settings = {}){
  const preElements = document.querySelectorAll(elements);
  preElements.forEach(preElement => {
    // Check if there's a special comment before this pre element
    let node = preElement.previousSibling;
    let foundConfig = false;

    // Look for HTML comments before the pre element
    while (node && !foundConfig) {
      if (node.nodeType === Node.COMMENT_NODE) {
        const commentText = node.textContent.trim();
        // Only set foundConfig to true if we explicitly find the add-marimo-button comment
        // Stop looking at other comments if we find any comment
        if (commentText.startsWith('add-marimo-button')) {
          foundConfig = true;
        }
        break;  // Exit after finding any comment
      }
      node = node.previousSibling;
    }

    // If we found a config comment, add the button
    if (foundConfig) {
      const codeElement = preElement.querySelector('code');
      if (codeElement) {
        // Create the button
        console.log("Making a button")
        const button = document.createElement('button');
        const defaults = {
          title: 'Open code in an interactive playground',
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          margin: '-4px 22px',
          cursor: 'pointer',
          zIndex: '10',
          filter: 'grayscale(100%)',
          icon: '<img src="icon.svg" alt="icon" width="20" height="20">',
        };

        const buttonSettings = Object.assign({}, defaults, settings);

        button.className = 'url-copy-button';
        button.title = buttonSettings.title;
        button.style.position = buttonSettings.position;
        button.style.top = buttonSettings.top;
        button.style.right = buttonSettings.right;
        button.style.border = buttonSettings.border;
        button.style.borderRadius = buttonSettings.borderRadius;
        button.style.padding = buttonSettings.padding;
        button.style.margin = buttonSettings.margin;
        button.style.cursor = buttonSettings.cursor;
        button.style.zIndex = buttonSettings.zIndex;
        button.style.filter = buttonSettings.filter;
        button.innerHTML = buttonSettings.icon;
        // Ensure the pre element has a relative position for button placement
        if (getComputedStyle(preElement).position === 'static') {
          preElement.style.position = 'relative';
        }

        button.addEventListener("mouseover", function() { button.style.filter = "grayscale(0%)"; });
        button.addEventListener("mouseout", function() { button.style.filter = 'grayscale(100%)'; });

        // Add click event to the button
        button.addEventListener('click', function(e) {
          e.preventDefault();

          // Get the code text
          let code = codeElement.textContent;
          // Wrap the code block in marimo notebook boilerplate
          code = `import marimo

app = marimo.App()

@app.cell
def _():
${code.split('\n').map(line => '    ' + line).join('\n')}
`;

          // Encode the code for use in a URL
          const encodedCode = encodeURIComponent(code);

          // Create the URL with the code as a query param
          let settings = {
            url: "https://marimo.app",
            paramName: 'code'
          };
          const url = `${settings.url}?${settings.paramName}=${encodedCode}`;
          console.log(url)

          // Open the URL in a new tab
          window.open(url, '_blank');
        });

        // Add the button to the pre element
        preElement.appendChild(button);
      }
    }
  });
}