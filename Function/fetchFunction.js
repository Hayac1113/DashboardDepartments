document.addEventListener('DOMContentLoaded', () => {
    fetchDepartmentData();
});

function fetchDepartmentData() {
    fetch('DepartmentData/department.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderDepartments(data);
        })
        .catch(error => {
            console.error('Error fetching department data:', error);
            document.getElementById('departmentName').innerHTML = '<p>Error loading department data.</p>';
        });
}

function renderDepartments(departments) {
    const container = document.getElementById('departmentName');

    if (!Array.isArray(departments) || departments.length === 0) {
        container.innerHTML = '<p>No department data available.</p>';
        return;
    }

    container.innerHTML = departments.map(dept => `
        <div class="department">
            <p><strong>Code:</strong> ${dept.code}</p>
            <p><strong>Name:</strong> ${dept.name}</p>
            <p><strong>Manager:</strong> ${dept.manager_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${dept.manager_email}">${dept.manager_email}</a></p>
        </div>
    `).join('');
}