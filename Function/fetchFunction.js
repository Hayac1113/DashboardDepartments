document.addEventListener('DOMContentLoaded', () => {
    function fetchDepartmentData() {
        fetch('./DepartmentData/department.json')
            .then(response => response.json())
            .then(data => renderName(data))
    }

    function renderName(data) {
        for (const department of data) {
            // Find the container where the department name will be displayed
            const departmentListItem = document.querySelector('#department-list-item');

            // Create all the necessary elements
            const departmentName = document.createElement('li');

            // add classes and ids.
            departmentName.className = 'department-name';

            // Insert data into the elements
            departmentName.innerHTML = `
                <p><strong>Code:</strong> ${department.code}</p>
                <p><strong>Name:</strong> ${department.name}</p>
                <p><strong>Manager:</strong> ${department.manager_name}</p>
                <p><strong>Email:</strong> <a href="mailto:${department.manager_email}">${department.manager_email}</a></p>
            `;
            // Append the department name to the list item
            departmentListItem.appendChild(departmentName);
        }
    }

    // Call the function to fetch and render department data
    fetchDepartmentData();
});