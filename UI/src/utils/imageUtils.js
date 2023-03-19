export async function getResizedImage1(file, width = 150, height = 150) {
  // Resize the image to 150x150
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = 150;
        elem.height = 150;
        const ctx = elem.getContext('2d');
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          blob => {
            resolve(blob);
          },
          'image/jpeg',
          1,
        );
      };
      reader.onerror = error => reject(error);
    };
  });
}
export async function getResizedImage(file, maxWidth, maxHeight) {
  const img = await new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = URL.createObjectURL(file);
  });

  // Use the global createImageBitmap function instead of the imported one
  const imageBitmap = await createImageBitmap(img);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  let {width, height} = img;
  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  return new Promise(resolve => {
    canvas.toBlob(resolve, file.type);
  });
}
