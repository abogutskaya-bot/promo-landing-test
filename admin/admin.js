function download() {
const text = document.getElementById('data').value;
const blob = new Blob([text], { type: 'application/json' });
const a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = 'offers.json';
a.click();
}