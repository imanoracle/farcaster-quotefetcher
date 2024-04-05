// Find all nav elements
const navElements = Array.from(document.querySelectorAll('nav'));

// Function to check if an element or its children contain the text "Quotes"
function containsQuotes(element) {
  if (element.textContent.includes("Quotes")) {
    return true;
  }
  // Check within child div and h2 elements
  for (let child of element.querySelectorAll('div, h2')) {
    if (child.textContent.includes("Quotes")) {
      return true;
    }
  }
  return false;
}

// Find the nav element that contains the text "Quotes"
const navWithQuotes = navElements.find(nav => containsQuotes(nav));

// Get the parent of the nav element
const parentOfNavWithQuotes = navWithQuotes ? navWithQuotes.parentElement : null;

// If the correct parent element is found, use it to find the user links
if (parentOfNavWithQuotes) {
  const userLinks = parentOfNavWithQuotes.querySelectorAll('a[href^="/"][title]');

  // Map through the found anchor tags to extract the usernames, excluding specific patterns and usernames
  const usernames = Array.from(userLinks)
    .filter(a => a.getAttribute('title') !== '' && !a.textContent.includes('@~') && !a.href.includes('/imanoracle'))
    .map(a => {
      const href = a.getAttribute('href');
      const username = href.split('/')[1];
      return username ? `@${username}` : '';
    })
    .filter(username => username);

  console.log(usernames);
} else {
  console.log('No nav element with the text "Quotes" found.');
}
