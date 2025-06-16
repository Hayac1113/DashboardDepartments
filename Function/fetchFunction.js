// Eventlistener for DOMContentLoad
document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch JSON Data and render the data in a table
    async function fetchJsonData(jsonPath, renderFunction) {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            renderFunction(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function renderTable(data) {
        // Check if table-container exists or create it
        let tableContainer = document.getElementById('table-container');
        if (!tableContainer) {
            tableContainer = document.createElement('div');
            tableContainer.id = 'table-container';
            document.body.appendChild(tableContainer);
        }
        tableContainer.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
            tableContainer.textContent = "No data available.";
            return;
        }

        // Get all unique headers and put them in an array
        const headers = Array.from(
            data.reduce((set, obj) => {
                Object.keys(obj).forEach(key => set.add(key));
                return set;
            }, new Set())
        );

        const table = document.createElement('table');

        // Create table head
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headers.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            headers.forEach(key => {
                const td = document.createElement('td');
                td.textContent = item[key] !== undefined ? item[key] : '';
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        tableContainer.appendChild(table);
    }

    // Use your actual JSON path below:
    fetchJsonData('/DepartmentData/users.json', renderTable);
});