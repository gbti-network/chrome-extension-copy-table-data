let lastRightClickedElement = null;

document.addEventListener('contextmenu', event => {
    lastRightClickedElement = event.target;
    console.log('Right-clicked element:', lastRightClickedElement);
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "selectTable") {
        console.log('Message received to select table', request);
        selectAllTableData();
    }
});

function selectAllTableData() {
    let table = findClosestTable();
    if (table) {
        console.log('Table found:', table);
        let text = getTableText(table);
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Table data copied to clipboard.');
            }).catch(err => {
                console.error('Could not copy table data to clipboard:', err);
            });
        }
        // No need to select the table anymore since we are directly writing to the clipboard
        logTableContents(table); // This will just log the content, not copy
    } else {
        console.log('No table found close to the right-clicked element.');
    }
}

function getTableText(table) {
    let text = '';
    for (let row of table.rows) {
        let cellsText = Array.from(row.cells).map(cell => cell.textContent.trim()).join('\t');
        text += cellsText + '\n';
    }
    return text;
}

function logTableContents(table) {
    let text = getTableText(table);
    console.log('Table Contents:\n' + text);
}

// Existing content.js code...

function findClosestTable() {
    if (lastRightClickedElement) {
        // Attempt to find the closest parent table of the last right-clicked element
        return lastRightClickedElement.closest('table');
    } else {
        console.log('No element was right-clicked before opening the context menu.');
        return null;
    }
}

