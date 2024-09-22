document.getElementById('usernameForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const birthYear = document.getElementById('birthYear').value;

    if (name && birthYear) {
        const username = generateUsername(name, birthYear);
        document.getElementById('generatedUsername').textContent = username + "@gmail.com";
        document.querySelector('.result').style.display = '';
    }
});

function generateUsername(name, birthYear) {
    const nameParts = name.split(' ');
    const firstName = nameParts[0].toLowerCase();
    const lastName = nameParts.length > 1 ? nameParts[1].toLowerCase() : '';
    
    // Option to append random numbers to avoid duplicates
    const randomNumber = Math.floor(Math.random() * 100);
    
    return `${firstName}${lastName}${birthYear}${randomNumber}`;
}

// Optional: Fetch random user data from the Random User API
fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
        const user = data.results[0];
        document.getElementById('name').value = `${user.name.first} ${user.name.last}`;
        document.getElementById('birthYear').value = new Date(user.dob.date).getFullYear();
    });