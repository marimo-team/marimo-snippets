document.addEventListener('DOMContentLoaded', function() {
  // Process all pre elements that contain code blocks
  const preElements = document.querySelectorAll(['pre', 'div.highlight']);
  console.log(preElements);
  preElements.forEach(preElement => {
    // Check if there's a special comment before this pre element
    let node = preElement.previousSibling;
    let foundConfig = null;
    
    // Look for HTML comments before the pre element
    while (node && !foundConfig) {
      if (node.nodeType === Node.COMMENT_NODE) {
        const commentText = node.textContent.trim();
        
        // Parse our special comment format: <!-- url-copy: URL [param-name: NAME] -->
        if (commentText.startsWith('url-copy:')) {
          try {
            const regex = /url-copy:\s*([^\s]+)(?:\s+param-name:\s*([^\s]+))?/;
            const match = commentText.match(regex);
            
            if (match) {
              foundConfig = {
                url: match[1],
                paramName: match[2] || 'code'
              };
            }
          } catch (e) {
            console.error('Error parsing url-copy comment:', e);
          }
        }
      }
      
      node = node.previousSibling;
    }
    
    // If we found a config comment, add the button
    if (foundConfig) {
      const codeElement = preElement.querySelector('code');
      
      if (codeElement) {
        // Create the button
        const button = document.createElement('button');
        button.className = 'url-copy-button';
        button.innerHTML = '🔗';
        button.title = 'Open code in new tab';
        button.style.position = 'absolute';
        button.style.top = '0.5rem';
        button.style.right = '0.5rem';
        button.style.background = 'rgba(255, 255, 255, 0.7)';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.padding = '4px 8px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '10';
        
        // Ensure the pre element has a relative position for button placement
        if (getComputedStyle(preElement).position === 'static') {
          preElement.style.position = 'relative';
        }
        
        // Add click event to the button
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Get the code text
          const code = codeElement.textContent;
          
          // Encode the code for use in a URL
          const encodedCode = encodeURIComponent(code);
          
          // Create the URL with the code as a query param
          const url = `${foundConfig.url}?${foundConfig.paramName}=${encodedCode}`;
          
          // Open the URL in a new tab
          window.open(url, '_blank');
        });
        
        // Add the button to the pre element
        preElement.appendChild(button);
      }
    }
  });
});