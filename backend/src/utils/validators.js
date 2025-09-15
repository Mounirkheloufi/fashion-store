
function validateEmail(email) {
    return /\S+@+\.\S+/.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

module.exports = { validateEmail, validatePassword };