// ROI Calculator for Predictive Maintenance (Updated Equations and Inputs)

function calculateROI() {
    // Get selected maintenance type (radio buttons)
    const maintenanceType = document.querySelector('input[name="maintenanceType"]:checked');
    
    // Default to 0 if none selected
    let input1 = 0;
    if (maintenanceType) {
        input1 = maintenanceType.value === "Reactive" ? 0.53 : 0.19;
    }

    const input2 = parseFloat(document.getElementById('input2').value) || 0; // Industry cost of downtime/hr
    const input3 = parseFloat(document.getElementById('input3').value) || 0; // Your cost of downtime/hr
    const input4 = parseFloat(document.getElementById('input4').value) || 0; // Planned downtime/month
    const input5 = parseFloat(document.getElementById('input5').value) || 0; // Number of planned downtime events/month
    const input6 = parseFloat(document.getElementById('input6').value) || 0; // Unplanned downtime/month
    const input7 = parseFloat(document.getElementById('input7').value) || 0; // Number of unplanned downtime events/month
    const input8 = parseFloat(document.getElementById('input8').value) || 0; // Number of maintenance staff
    const input9 = parseFloat(document.getElementById('input9').value) || 0; // Avg hourly cost per maintenance staff
    const input10 = parseFloat(document.getElementById('input10').value) || 0; // Number of assets
    const input11 = parseFloat(document.getElementById('input11').value) || 0; // Annual cost per asset

    // Output 1 = Hours of Unplanned Downtime per Year
    const output1 = input6 * 12;

    // Output 2 = Average Industry Cost of Downtime per Year
    const output2 = input2 * output1;

    // Output 3 = Your Financial Loss Due to Unplanned Downtime per Year
    const output3 = input3 * input6 * 12;

    // Output 4 = Cost of Planned Maintenance per Hour
    const output4 = (input8 * input9) + input3;

    // Output 5 = Cost of Planned Maintenance per Year
    const output5 = output4 * input4 * 12;

    // Output 6 = Current Annual Maintenance Costs (Planned + Unplanned)
    const output6 = output3 + output5;

    // Output 7 = New Annual Maintenance Costs with Predictive Maintenance
    const output7 = output6 * 0.7;

    // Output 8 = Total Annual Financial Savings
    const output8 = (input6 * input1 * input3 * 12) + (output6 * 0.3);

    // Output 9 = Number of Hours Saved per Year
    const output9 = input6 * input1 * 12;

    // Display all 9 results with units
    document.getElementById('output1').textContent = `${Math.round(output1)} hours`;
    document.getElementById('output2').textContent = `£${Math.round(output2)}`;
    document.getElementById('output3').textContent = `£${Math.round(output3)}`;
    document.getElementById('output4').textContent = `£${Math.round(output4)} per hour`;
    document.getElementById('output5').textContent = `£${Math.round(output5)} per year`;
    document.getElementById('output6').textContent = `£${Math.round(output6)} per year`;
    document.getElementById('output7').textContent = `£${Math.round(output7)} per year`;
    document.getElementById('output8').textContent = `£${Math.round(output8)} total savings`;
    document.getElementById('output9').textContent = `${Math.round(output9)} hours saved`;

}

