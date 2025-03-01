
document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table'); // Select the table

    // Function to load saved values from localStorage
    function loadSavedValues() {
        for (let i = 0; i < table.rows.length; i++) { // Iterate through rows
            for (let j = 0; j < table.rows[i].cells.length; j++) { // Iterate through columns
                const input = table.rows[i].cells[j].querySelector('input');
                if (input) {
                    const key = `row${i+1}col${j+1}`; // Create the key as rowXcolY
                    const savedValue = localStorage.getItem(key); // Get the saved value from localStorage
                    if (input.type === 'checkbox') {
                        input.checked = savedValue === 'true'; // Set checked state for checkboxes
                    } else {
                        input.value = savedValue || ''; // Set value for text inputs
                    }
                }
            }
        }
    }

    // Load the saved input values when the page loads
    loadSavedValues();

    // Save input values to localStorage when they change
    table.addEventListener('change', function(event) {
        if (event.target.tagName === 'INPUT') { // Check if the changed element is an input
            const input = event.target;
            const row = input.closest('tr').rowIndex + 1; // Get row index, adding 1 to start from 1
            const col = input.closest('td').cellIndex + 1; // Get column index, adding 1 to start from 1
            const key = `row${row}col${col}`; // Create the key as rowXcolY
            const value = input.type === 'checkbox' ? input.checked : input.value; // Get the value or checked status
            localStorage.setItem(key, value); // Save to localStorage
        }
    });
});
