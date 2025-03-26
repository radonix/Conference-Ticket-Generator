const dragDropArea = document.getElementById('drag-drop-area');
const fileInputDD = document.getElementById('file-input');
const fileNameDisplayDD = document.getElementById('file-input-display');
const updateButton = document.getElementById('update-button');
updateButton.addEventListener('click', updateTicketInfo);

dragDropArea.addEventListener('click', () => fileInputDD.click());

dragDropArea.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    dragDropArea.classList.add('dragover');
});

dragDropArea.addEventListener('dragleave', () => {
    dragDropArea.classList.remove('dragover');
});

function handleFileSelect(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem('avatarImage', event.target.result);
    };
    reader.readAsDataURL(file);
}
dragDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0  && files[0].size <= 500 * 1024) {
        fileInputDD.files = files;
        fileNameDisplayDD.textContent = `File selected`;
        fileNameDisplayDD.style.color = 'white'; 
        document.getElementById("upload-restriction").innerHTML = "";
        handleFileSelect(files[0]);
        document.getElementById("upload-icon").src = localStorage.getItem('avatarImage');
    } else {
        document.getElementById("upload-restriction").innerHTML = "File too large. Please select a photo under 500KB. ";
        document.getElementById("upload-restriction").style.color ="hsl(7, 88%, 67%)" ;
        fileNameDisplayDD.textContent = '';
        fileInputDD.value = ''; 
    }
});
fileInputDD.addEventListener('change', () => {
    const files = fileInputDD.files;
    if (files.length > 0 && files[0].size <= 500 * 1024) {
        fileNameDisplayDD.textContent = `File selected`;
        fileNameDisplayDD.style.color = 'white'; 
        document.getElementById("upload-restriction").innerHTML = "";
        handleFileSelect(files[0]);
        document.getElementById("upload-icon").src = localStorage.getItem('avatarImage');
    } else {
        document.getElementById("upload-restriction").innerHTML = "File too large. Please select a photo under 500KB. ";
        document.getElementById("upload-restriction").style.color ="hsl(7, 88%, 67%)" ;
        fileNameDisplayDD.textContent = '';
        fileInputDD.value = ''; 
    }
});
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function updateTicketInfo(event) {
    event.preventDefault();


    const inputNome = document.getElementById("full-name").value;
    const inputEmail = document.getElementById("email").value;
    const inputGithub = document.getElementById("github").value;

    if (!isValidEmail(inputEmail)) {
        document.getElementById("error-email").innerHTML = "Invalid email address";
        document.getElementById("email").style.border = "1px solid hsl(7, 88%, 67%)";
        return;
    }

 
    localStorage.setItem('fullName', inputNome);
    localStorage.setItem('email', inputEmail);
    localStorage.setItem('github', inputGithub);


    window.location.href = 'ticket.html';
}

