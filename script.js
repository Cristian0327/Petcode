// Variable para almacenar la imagen del gato
let catImageSrc = '';

// Función para mostrar el formulario de detalles del gato
function showCatDetailsForm() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('cat-details-form').classList.add('active');
}

// Función para cargar la imagen del gato
function loadCatImage(event) {
    const reader = new FileReader();
    reader.onload = function(){
        catImageSrc = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Función para guardar los detalles del gato
function saveCatDetails() {
    const catName = document.getElementById('cat-name').value;
    const catAge = document.getElementById('cat-age').value;
    const catWeight = document.getElementById('cat-weight').value + " kg";
    const catFoodPreferences = document.getElementById('cat-food-preferences').value;

    localStorage.setItem('catName', catName);
    localStorage.setItem('catAge', catAge);
    localStorage.setItem('catWeight', catWeight);
    localStorage.setItem('catFoodPreferences', catFoodPreferences);
    localStorage.setItem('catImageSrc', catImageSrc);

    showMainContent();
    loadCatDetails();
}

// Función para cargar los detalles del gato
function loadCatDetails() {
    const catName = localStorage.getItem('catName') || 'Whiskers';
    const catAge = localStorage.getItem('catAge') || '2 años';
    const catWeight = localStorage.getItem('catWeight') || '4 kg';
    const catFoodPreferences = localStorage.getItem('catFoodPreferences') || 'Comida seca';
    const catImageSrc = localStorage.getItem('catImageSrc') || '';

    document.getElementById('cat-name-display').innerText = `Nombre: ${catName}`;
    document.getElementById('cat-age-display').innerText = `Edad: ${catAge}`;
    document.getElementById('cat-weight-display').innerText = `Peso: ${catWeight}`;
    document.getElementById('cat-food-preferences-display').innerText = `Preferencias Alimenticias: ${catFoodPreferences}`;

    if (catImageSrc) {
        document.getElementById('profile-pic').style.backgroundImage = `url(${catImageSrc})`;
    }
}

// Función para mostrar el contenido principal y ocultar la pantalla de inicio
function showMainContent() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('main-content').classList.add('active');

    // Configurar la alarma para sonar después de un minuto
    setTimeout(triggerAlarm, 60000);
}

// Función para mostrar la página de tips de alimentación
function showTipsPage() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('tips-page').classList.add('active');
}

// Función para mostrar los detalles de un tip específico
function showTipDetails(tipId) {
    fetch('tips.json')
        .then(response => response.json())
        .then(data => {
            const tip = data.tips.find(t => t.id === tipId);
            const content = `
                <h2>${tip.title}</h2>
                <p>${tip.content}</p>
            `;
            document.getElementById('tip-detail-content').innerHTML = content;
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById('tip-detail-page').classList.add('active');
        })
        .catch(error => console.error('Error al cargar los tips:', error));
}

// Función para alternar la visibilidad de las secciones
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

// Función para agregar una nueva fila al historial de alimentación
function addRow() {
    const table = document.getElementById('historial-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const dateCell = newRow.insertCell(0);
    const timeCell = newRow.insertCell(1);
    const quantityCell = newRow.insertCell(2);

    dateCell.innerHTML = '<input type="date">';
    timeCell.innerHTML = '<input type="time">';
    quantityCell.innerHTML = `
        <select>
            <option value="10">10g</option>
            <option value="20">20g</option>
            <option value="30">30g</option>
            <option value="40">40g</option>
            <option value="50">50g</option>
        </select>`;
}

// Función para eliminar la última fila del historial de alimentación
function deleteLastRow() {
    const table = document.getElementById('historial-table').getElementsByTagName('tbody')[0];
    if (table.rows.length > 1) { // Evitar eliminar todas las filas
        table.deleteRow(table.rows.length - 1);
    } else {
        alert('No se puede eliminar la última fila.');
    }
}

// Función para guardar el historial de alimentación
function saveHistorial() {
    const table = document.getElementById('historial-table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const historialData = [];

    for (let i = 0; i < rows.length; i++) {
        const date = rows[i].getElementsByTagName('td')[0].getElementsByTagName('input')[0].value;
        const time = rows[i].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
        const quantity = rows[i].getElementsByTagName('td')[2].getElementsByTagName('select')[0].value;

        historialData.push({ date, time, quantity });
    }

    console.log('Historial Guardado:', historialData);
    
    // Mostrar mensaje de guardado
    const saveMessage = document.getElementById('save-message');
    saveMessage.style.display = 'block';
    setTimeout(() => {
        saveMessage.style.display = 'none';
    }, 3000);
}

// Función para activar la alarma de alimentación
function triggerAlarm() {
    const alarmMessage = document.getElementById('alarm-message');
    const alarmSound = document.getElementById('alarm-sound');
    
    alarmMessage.style.display = 'block';
    alarmSound.play();

    // Detener el sonido y ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmMessage.style.display = 'none';
    }, 5000);
}

// Evento que se ejecuta cuando el contenido del DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la pantalla de inicio al cargar la página
    document.getElementById('inicio').classList.add('active');
    
    // Asignar evento al botón de selección de archivo
    const fileInput = document.getElementById('cat-image');
    const fileBtn = document.querySelector('.file-btn');
    
    fileBtn.addEventListener('click', () => {
        fileInput.click();
    });
});
