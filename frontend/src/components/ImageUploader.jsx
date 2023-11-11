import React, { useState, useEffect, useRef } from 'react';

export default function ImageUploader({ bookData }) { // Asumsi bookData diterima sebagai prop
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Pastikan bookData ada dan memiliki property image sebelum melakukan proses berikutnya
    if (bookData?.image) {
      // Menggunakan Blob akan lebih sesuai untuk menangani binary data
      // Jika bookData.image adalah URL, kita tidak perlu mengonversinya menjadi File
      setSelectedImage(bookData.image);
      // Pastikan fileInputRef ada dan memiliki current sebelum melakukan reset
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [bookData]);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        required
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
}
