function fetchMembersFromLocalStorage() {
    const members   = JSON.parse(localStorage.getItem('members')) || [];
    const tableBody = document.getElementById('tableBody');

    // Clear the table body
    tableBody.innerHTML = '';

    if (members.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted py-4">
                    No members added yet. Click "+ Add Member" to get started.
                </td>
            </tr>
        `;
        return;
    }

    // Display each member
    members.forEach((member, index) => {
        const statusClass = member.status === 'Active' ? 'text-success' : 'text-danger';

        const row = `
            <tr>
                <td>${member.name}</td>
                <td>${member.id}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${member.membershipType}</td>
                <td class="${statusClass}"><strong>${member.status}</strong></td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteMember(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

}

let loadMembersBtn = document.getElementById('loadMembersBtn');
if (loadMembersBtn) {
    loadMembersBtn.addEventListener('click', fetchMembersFromLocalStorage);
} else {
    console.error('Load Members button not found!');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    fetchMembersFromLocalStorage(); // Optionally fetch members on page load

});