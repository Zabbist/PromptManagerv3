document.addEventListener('DOMContentLoaded', function() {
  var copyButton = document.getElementById('copyButton');
  var isClicked = false;

  function handleClick() {
    if (!isClicked) {
      isClicked = true;

      var selectedFile = document.getElementById('fileDropdown').value;
      var repoURL = 'https://github.com/Zabbist/PromptManagerv3';

      fetchGitHubFileContent(repoURL, selectedFile)
        .then(function(fileContent) {
          copyToClipboard(fileContent);
          alert('File content copied to clipboard!');
        })
        .catch(function(error) {
          console.error('Error fetching file content:', error);
        });
    }
  }

  copyButton.addEventListener('click', handleClick);
});

function fetchGitHubFileContent(repoURL, fileName) {
  var apiUrl = 'https://api.github.com/repos';
  var match = repoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
  
  if (match && match.length >= 3) {
    var owner = match[1];
    var repo = match[2];
    var fileUrl = `${apiUrl}/${owner}/${repo}/contents/${fileName}`;

    return fetch(fileUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(function(data) {
        var content = data.content;
        return atob(content);
      });
  } else {
    return Promise.reject('Invalid GitHub repository URL');
  }
}

function copyToClipboard(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
