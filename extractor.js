let buttonSettings = {
  elements: ['pre'],
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
  icon: '<img src="https://cms.marimo.io/icons/favicon.svg" alt="icon" width="20" height="20">',
};

let iframeSettings = {
  elements: ['pre'],
  height: '400px',
  width: '100%',
  border: '1px solid #ddd',
  borderRadius: '4px',
  margin: '1rem 0',
  url: 'https://marimo.app',
  paramName: 'code'
};


/**
 * Configure interactive buttons for code blocks that open the code in a Marimo playground
 * @param {Object} settings - Button customization options
 * @param {string[]} [settings.elements=['pre', 'div.highlight'] - CSS selectors for elements to add buttons to. Default: ['pre', 'div.highlight']
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
 * @param {string} [settings.icon='<img src="https://cms.marimo.io/icons/favicon.svg" alt="icon" width="20" height="20">'] - HTML content for the button
 */
function configureMarimoButtons(settings = {}) {
  buttonSettings = { ...buttonSettings, ...settings };
}

/**
* @param {Object} settings - Iframe customization options
* @param {string[]} [settings.elements=['pre', 'div.highlight'] - CSS selectors for elements to add buttons to. Default: ['pre', 'div.highlight']
* @param {string} [settings.height='400px'] - Height of the iframe
* @param {string} [settings.width='100%'] - Width of the iframe
* @param {string} [settings.border='1px solid #ddd'] - Border style of the iframe
* @param {string} [settings.borderRadius='4px'] - Corner radius of the iframe
* @param {string} [settings.margin='1rem 0'] - Margin around the iframe
* @param {string} [settings.url='https://marimo.app'] - Base URL for the Marimo instance
* @param {string} [settings.paramName='code'] - Query parameter name for the code
*/
function configureMarimoIframes(settings = {}) {
  iframeSettings = { ...iframeSettings, ...settings };
};


function generateCell(code) {
  return `@app.cell
def _():
${code.split('\n').map(line => '    ' + line).join('\n')}
`;
}

function generateNotebook(cells) {
  return `import marimo

app = marimo.App()

${cells}
`;
}

function createButton(codeElement) {
  const button = document.createElement('button');
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

  button.addEventListener("mouseover", function() { button.style.filter = "grayscale(0%)"; });
  button.addEventListener("mouseout", function() { button.style.filter = 'grayscale(100%)'; });
  button.addEventListener('click', function(e) {
    e.preventDefault();

    const code = generateNotebook(generateCell(codeElement.textContent));
    const encodedCode = encodeURIComponent(code);
    let settings = {
      url: "https://marimo.app",
      paramName: 'code'
    };
    const url = `${settings.url}?${settings.paramName}=${encodedCode}`;
    window.open(url, '_blank');
  });

  return button;
}

/**
 * Adds interactive buttons to code blocks that open the code in a Marimo playground
 */
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('script[type="text/x-codesend-config"]').forEach(script => {
    eval(script.textContent);
  });

  const buttons = document.querySelectorAll('marimo-button');
  buttons.forEach(button => {
    const preElement = button.querySelector(buttonSettings.elements.join(","));
    if (!preElement) {
      return;
    }
    // Ensure the pre element has a relative position for button placement
    if (getComputedStyle(preElement).position === 'static') {
      preElement.style.position = 'relative';
    }
    preElement.appendChild(createButton(preElement));
  });
});

/**
 * Replaces code blocks with inline marimo notebooks
 */
document.addEventListener("DOMContentLoaded", function() {
  const marimoFrames = document.querySelectorAll("marimo-iframe");
  marimoFrames.forEach(marimoFrame => {
    const preElements = marimoFrame.querySelectorAll(iframeSettings.elements);
    if (preElements.length == 0) {
      return;
    }

    const cells = Array.from(preElements).map((element) => {
      return generateCell(element.textContent);
    })

    const code = generateNotebook(cells.join("\n"));

    const iframe = document.createElement('iframe');
    iframe.style.height = iframeSettings.height;
    iframe.style.width = iframeSettings.width;
    iframe.style.border = iframeSettings.border;
    iframe.style.borderRadius = iframeSettings.borderRadius;
    iframe.style.margin = iframeSettings.margin;

    const encodedCode = encodeURIComponent(code);
    const url = `${iframeSettings.url}?${iframeSettings.paramName}=${encodedCode}&embed=true&show-chrome=false`;
    iframe.src = url;
    marimoFrame.replaceWith(iframe);
  });
});
