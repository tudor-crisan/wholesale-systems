document.getElementById('syncBtn').addEventListener('click', async () => {
  const statusEl = document.getElementById('status');
  const syncBtn = document.getElementById('syncBtn');
  const pageCount = parseInt(document.getElementById('pageCount').value) || 1;
  
  statusEl.textContent = 'Preparing Crawler...';
  statusEl.className = '';
  syncBtn.disabled = true;

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes('skool.com')) {
      throw new Error('Please open a Skool group first');
    }

    // Define listener
    const messageListener = (message) => {
      console.log('Popup received:', message);
      if (message.type === 'CRAWL_PROGRESS') {
        statusEl.textContent = `Capturing Page ${message.page} of ${message.total}...`;
        statusEl.style.background = '#fef9c3';
        statusEl.style.color = '#854d0e';
      }
      if (message.type === 'CRAWL_COMPLETE') {
        statusEl.textContent = 'Success! Niche Updated.';
        statusEl.style.background = '#dcfce7';
        statusEl.style.color = '#166534';
        syncBtn.disabled = false;
        chrome.runtime.onMessage.removeListener(messageListener);
      }
      if (message.type === 'CRAWL_ERROR') {
        statusEl.textContent = 'Error: ' + message.error;
        statusEl.className = 'error';
        syncBtn.disabled = false;
        chrome.runtime.onMessage.removeListener(messageListener);
      }
    };

    // Add listener BEFORE sending the start command
    chrome.runtime.onMessage.addListener(messageListener);

    // Start crawl
    chrome.tabs.sendMessage(tab.id, { 
      action: 'crawl', 
      pages: pageCount 
    }, (response) => {
       if (chrome.runtime.lastError) {
         statusEl.textContent = 'Error: Reload Skool page first';
         statusEl.className = 'error';
         syncBtn.disabled = false;
         chrome.runtime.onMessage.removeListener(messageListener);
       } else {
         statusEl.textContent = 'Intelligence Crawl Started...';
       }
    });

  } catch (error) {
    statusEl.textContent = error.message;
    statusEl.className = 'error';
    syncBtn.disabled = false;
  }
});
