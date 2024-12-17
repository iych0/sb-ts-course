const upload = document.getElementById('upload');
const image = document.getElementById('image');
const croppedImageElement = document.getElementById('cropped-image');
const cropButton = document.getElementById('crop');
const downloadButton = document.getElementById('download');
let cropper;
let lastCroppedImage;

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.src = e.target.result;
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(image, {
                aspectRatio: NaN,
                viewMode: 1,
                autoCrop: false,
                autoCropArea: 1,
                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: true,
            });
        };
        reader.readAsDataURL(file);
    }
});

cropButton.addEventListener('click', () => {
    if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        lastCroppedImage = croppedCanvas.toDataURL('image/png');
        croppedImageElement.src = lastCroppedImage;
        croppedImageElement.style.display = 'block';
        cropper.clear();
    }
});

downloadButton.addEventListener('click', () => {
    if (lastCroppedImage) { // Используем сохраненное обрезанное изображение
        const link = document.createElement('a');
        link.href = lastCroppedImage;
        link.download = 'cropped-image.png';
        link.click();
    }
});