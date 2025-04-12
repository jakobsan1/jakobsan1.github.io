// ROI Calculator for Predictive Maintenance (Updated Equations and Inputs - VERSION 10)

// This script is responsible for taking user inputs from the ROI form,
// performing financial and time-saving calculations,
// and showing the results on the screen, including a bar chart for comparison.

let costChart = null; // This will store the chart so we can update it later if needed

// This function is triggered when the "Calculate ROI" button is pressed
function calculateROI() {
    // 1. Get the selected maintenance type (either Reactive or Preventive)
    const maintenanceType = document.querySelector('input[name="maintenanceType"]:checked');
    let input1 = maintenanceType ? (maintenanceType.value === "Reactive" ? 0.53 : 0.19) : 0;

    // 2. Get all the numerical values the user typed or selected
    const input2 = parseFloat(document.getElementById('input2').value) || 0;  // Industry average cost of downtime
    const input3 = parseFloat(document.getElementById('input3').value) || 0;  // Your own cost of downtime
    const input4 = parseFloat(document.getElementById('input4').value) || 0;  // Hours of planned downtime
    const input5 = parseFloat(document.getElementById('input5').value) || 0;  // Events of planned downtime
    const input6 = parseFloat(document.getElementById('input6').value) || 0;  // Hours of unplanned downtime
    const input7 = parseFloat(document.getElementById('input7').value) || 0;  // Events of unplanned downtime
    const input8 = parseFloat(document.getElementById('input8').value) || 0;  // Number of maintenance staff
    const input9 = parseFloat(document.getElementById('input9').value) || 0;  // Hourly cost per maintenance staff
    const input10 = parseFloat(document.getElementById('input10').value) || 0; // Number of assets
    const input11 = parseFloat(document.getElementById('input11').value) || 0; // Maintenance cost per asset

    // 3. Use formulas to calculate the 9 results based on inputs
    const output1 = input6 * 12;  // Unplanned downtime per year
    const output2 = input2 * output1;  // Industry cost of unplanned downtime
    const output3 = input3 * input6 * 12;  // Your actual cost of unplanned downtime
    const output4 = (input8 * input9) + input3;  // Planned maintenance cost per hour
    const output5 = output4 * input4 * 12;  // Planned maintenance cost per year
    const output6 = output3 + output5;  // Total current annual maintenance costs
    const output7 = output6 * 0.7;  // Estimated cost after using predictive maintenance
    const output8 = (input6 * input1 * input3 * 12) + (output6 * 0.3); // Total annual financial savings
    const output9 = input6 * input1 * 12; // Number of hours saved per year

    // 4. Calculate how much percentage the new cost is reduced from the old cost
    const percentageDecrease = output6 > 0 ? ((output6 - output7) / output6 * 100).toFixed(1) : 0;

    // 5. Prepare the results to show on screen
    const outputs = [
        { id: 'output1', value: output1, suffix: ' hours' },
        { id: 'output2', value: output2, prefix: '£', suffix: ' per year' },
        { id: 'output3', value: output3, prefix: '£', suffix: ' per year' },
        { id: 'output4', value: output4, prefix: '£', suffix: ' per hour' },
        { id: 'output5', value: output5, prefix: '£', suffix: ' per year' },
        { id: 'output6', value: output6, prefix: '£', suffix: ' per year' },
        { id: 'output7', value: output7, prefix: '£', suffix: ' per year' },
        { id: 'output8', value: output8, prefix: '£', suffix: ' total savings', class: 'output-green' },
        { id: 'output9', value: output9, suffix: ' hours saved', class: 'output-green' }
    ];

    // 6. Update the values on the page by targeting their span IDs
    outputs.forEach(output => {
        const el = document.getElementById(output.id); // Find the output placeholder
        const formatted = `${output.prefix || ''}${Math.round(output.value).toLocaleString()}${output.suffix || ''}`;
        el.textContent = formatted; // Replace with new value
        el.classList.remove('output-green'); // Reset class
        if (output.class) el.classList.add(output.class); // Add class for green highlights (savings)
    });

    // 7. Update the text that shows percentage decrease
    document.getElementById('percentageDecrease').textContent = `Percentage Decrease: ${percentageDecrease}%`;

    // 8. Draw the bar chart or update it with the new values
    const ctx = document.getElementById('costComparisonChart').getContext('2d');
    if (costChart) {
        // If chart already exists, just update the data
        costChart.data.datasets[0].data = [Math.round(output6), Math.round(output7)];
        costChart.update();
    } else {
        // If chart doesn't exist yet, create a new one
        costChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Current Maintenance Costs', 'Maintenance Costs with Predictive Maintenance'],
                datasets: [{
                    label: 'Annual Maintenance Costs (£)',
                    data: [Math.round(output6), Math.round(output7)],
                    backgroundColor: ['#00274D', '#28a745'],
                    borderColor: ['#001a36', '#1e7e34'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // Makes the chart resize with screen
                maintainAspectRatio: false, // Allows flexible height/width
                scales: {
                    y: {
                        beginAtZero: true, // Start Y-axis at 0
                        title: {
                            display: true,
                            text: 'Cost (£)',
                            color: '#00274D',
                            font: { size: 14 }
                        },
                        ticks: {
                            callback: value => '£' + value.toLocaleString(), // Add £ symbol to axis labels
                            color: '#333'
                        },
                        grid: { color: '#e1e1e1' }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Maintenance Type',
                            color: '#00274D',
                            font: { size: 14 }
                        },
                        ticks: { color: '#333' },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }, // Hide the legend
                    tooltip: {
                        callbacks: {
                            label: context => `£${context.parsed.y.toLocaleString()}` // Format tooltips with £
                        }
                    }
                }
            }
        });
    }
}

// This function resets all inputs, outputs, and the chart when "Reset Form" is clicked
function resetForm() {
    // 1. Clear all inputs in the form
    document.getElementById("calculator-form").reset();

    // 2. Reset all output text values to '0'
    const outputIds = ['output1', 'output2', 'output3', 'output4', 'output5', 'output6', 'output7', 'output8', 'output9'];
    outputIds.forEach(id => {
        const el = document.getElementById(id);
        el.textContent = '0';
        el.classList.remove('output-green'); // Remove green highlight if present
    });

    // 3. Reset the percentage decrease text
    document.getElementById('percentageDecrease').textContent = 'Percentage Decrease: 0%';

    // 4. Clear the bar chart data
    if (costChart) {
        costChart.data.datasets[0].data = [0, 0];
        costChart.update();
    }
}
