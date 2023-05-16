chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'copyFileContent') {
    var folderPath = request.folder;
    var fileName = request.file;

    if (folderPath && fileName) {
      chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getDirectory(folderPath, {}, function(folder) {
          folder.getFile(fileName, {}, function(file) {
            var reader = new FileReader();
            reader.onloadend = function(event) {
              var fileContent = event.target.result;
              sendResponse({ success: true, fileContent: fileContent });
            };
            reader.readAsText(file);
          }, function(error) {
            sendResponse({ success: false, error: error.message });
          });
        }, function(error) {
          sendResponse({ success: false, error: error.message });
        });
      });
    } else {
      sendResponse({ success: false, error: 'Invalid folder or file selection.' });
    }

    return true;
  }
});
