document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const appointmentData = {
        date: formData.get('date'),
        time: formData.get('time'),
        clientName: formData.get('clientName'),
        phoneNumber: formData.get('phoneNumber')
    };

    fetch('/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao agendar horário.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('message').textContent = `Horário agendado com sucesso para ${data.clientName} em ${data.date} às ${data.time}.`;
        document.getElementById('appointmentForm').reset();
    })
    .catch(error => {
        document.getElementById('message').textContent = error.message;
    });
});
