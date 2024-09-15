document.addEventListener('DOMContentLoaded', () => {
    const storeForm = document.getElementById('store-form');
    const retrieveForm = document.getElementById('retrieve-form');
    const fieldsContainer = document.getElementById('fields-container');
    const resultDiv = document.getElementById('result');

    // Generate input fields based on platform fields
    storeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const platform = document.getElementById('platform').value;
        const fields = document.getElementById('fields').value.split(',').map(f => f.trim());

        fieldsContainer.innerHTML = '';
        fields.forEach(field => {
            fieldsContainer.innerHTML += `
                <label for="${field}">${field}:</label>
                <input type="text" id="${field}" name="${field}" required>
            `;
        });

        storeForm.insertAdjacentHTML('beforeend', '<button type="submit">Store Data</button>');
    });

    // Store data in localStorage
    storeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const platform = document.getElementById('platform').value;
        const fields = document.getElementById('fields').value.split(',').map(f => f.trim());
        
        const data = fields.map(field => `${field}: ${document.getElementById(field).value}`).join('\n');
        const filename = `${platform}_${Date.now()}.txt`;
        
        const encryptedData = CryptoJS.AES.encrypt(data, 'secret-key').toString();
        localStorage.setItem(filename, encryptedData);
        
        alert(`Data stored in file: ${filename}`);
    });

    // Retrieve data from localStorage
    retrieveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const platform = document.getElementById('retrieve-platform').value;
        const number = document.getElementById('number').value;
        const filename = `${platform}_${number}.txt`;
        
        const encryptedData = localStorage.getItem(filename);
        if (encryptedData) {
            const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret-key');
            const data = bytes.toString(CryptoJS.enc.Utf8);
            resultDiv.textContent = data;
        } else {
            resultDiv.textContent = 'File not found.';
        }
    });
});
