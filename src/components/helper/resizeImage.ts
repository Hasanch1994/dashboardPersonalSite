import Resizer from "react-image-file-resizer";

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      768,
      "JPEG",
      70,
      0,
      (uri: any) => {
        fetch(uri)
          .then((res) => res.arrayBuffer())
          .then((buffer) => {
            const resizedFile = new File([buffer], file.name, {
              type: "image/jpeg",
            });
            resolve(resizedFile);
          });
      },
      "base64"
    );
  }).then((resolve) => {
    return resolve;
  });
