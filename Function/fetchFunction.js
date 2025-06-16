document.addEventListener('DOMContentLoaded', () => {
    function fetchJsonData(jsonPath, renderFunction) {
        fetch(jsonPath)
            .then(response => response.json())
            .then(data => renderFunction(data))
            .catch(error => console.error("Fetch error:", error));
    }

    // Generic table render function
    function renderTable(data) {
        // Find or create a container for the table
        let tableContainer = document.querySelector('#table-container');
        if (!tableContainer) {
            tableContainer = document.createElement('div');
            tableContainer.id = 'table-container';
            document.body.appendChild(tableContainer);
        }
        tableContainer.innerHTML = ""; // Clear previous content

        if (!Array.isArray(data) || data.length === 0) {
            tableContainer.textContent = "No data available.";
            return;
        }

        // Create table and header
        const table = document.createElement('table');
        table.border = '1';
        table.style.borderCollapse = 'collapse';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Get unique headers from all object keys
        const headers = Array.from(
            data.reduce((set, obj) => {
                Object.keys(obj).forEach(key => set.add(key));
                return set;
            }, new Set())
        );

        // Create header cells
        headers.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            th.style.padding = '5px';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create body rows
        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            headers.forEach(key => {
                const td = document.createElement('td');
                td.textContent = item[key] !== undefined ? item[key] : '';
                td.style.padding = '5px';
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        tableContainer.appendChild(table);
    }

    // Example usage with your JSON
    fetchJsonData('./DepartmentData/department.json', renderTable);

    // You can call fetchJsonData('path/to/any.json', renderTable);
});