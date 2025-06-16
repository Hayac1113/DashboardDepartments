// Eventlistener for DOMContentLoad
document.addEventListener('DOMContentLoaded', () => {
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

    // Sorting state
    let currentSort = {
        key: null,
        direction: 'asc'
    };

    function renderTable(data) {
        // Store original data
        if (!renderTable.originalData) renderTable.originalData = data.slice();
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

        // Get all unique headers
        const headers = Array.from(
            data.reduce((set, obj) => {
                Object.keys(obj).forEach(key => set.add(key));
                return set;
            }, new Set())
        );

        const table = document.createElement('table');

        // Table head with sorting buttons
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headers.forEach(key => {
            const th = document.createElement('th');
            th.style.cursor = "pointer";
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1);

            // Add sort indicator
            if (currentSort.key === key) {
                th.textContent += currentSort.direction === "asc" ? " ▲" : " ▼";
            }

            // Click to sort
            th.addEventListener('click', () => {
                // Toggle direction if same column, else default to asc
                if (currentSort.key === key) {
                    currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
                } else {
                    currentSort.key = key;
                    currentSort.direction = "asc";
                }
                // Sort and re-render
                const sortedData = sortData(renderTable.originalData.slice(), currentSort.key, currentSort.direction);
                renderTable(sortedData);
            });
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Table body
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

    // Generic sort for string/number
    function sortData(data, key, direction) {
        return data.sort((a, b) => {
            let valA = a[key] !== undefined ? a[key] : '';
            let valB = b[key] !== undefined ? b[key] : '';

            // Try to compare as numbers if possible
            const numA = parseFloat(valA);
            const numB = parseFloat(valB);
            if (!isNaN(numA) && !isNaN(numB)) {
                valA = numA;
                valB = numB;
            } else {
                // Compare as lowercase strings
                valA = String(valA).toLowerCase();
                valB = String(valB).toLowerCase();
            }

            if (valA < valB) return direction === 'asc' ? -1 : 1;
            if (valA > valB) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    // Use your actual JSON path below:
    fetchJsonData('/DepartmentData/users.json', renderTable);
});