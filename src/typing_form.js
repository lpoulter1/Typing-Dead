const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const form = document.getElementById('typingForm');

form.addEventListener('enter', handleZombie(e))
