import React, {useState} from 'react';
import {db, auth, storage} from '../config/firebaseConfig'; // Import your Firebase configuration
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import './SellPage.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {getResizedImage} from '../utils/imageUtils';
import {generateUniqueId} from '../utils/generalUtils'; // Import your CSS for styling

const SellPage = ({currentUser}) => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [listDate, setListDate] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const storage = getStorage();

  const categories = [
    'Electronics',
    'Clothing',
    'Tools',
    'Clothing',
    'Vehicle',
    'Sports & Outdoors',
    'Kitchen',
    'Other',
  ];

  const handleImageUpload = async e => {
    if (e.target.files) {
      const uploadedImages = Array.from(e.target.files)
        .slice(0, 5)
        .map(file => {
          URL.createObjectURL(file);
          console.log('file: ', file);
          return file;
        });
      const file = e.target.files[0];
      let newImages = [];
      console.log('newImages: ', newImages);
      console.log('images: ', images);
      const resizedImage = await getResizedImage(file, 400, 400);

      setLoading(true);
      setProgress(0);
      const uniqueId = generateUniqueId();
      const uniqueImageName = `${uniqueId}-${file.name}`;
      const storageRef = ref(
        storage,
        `rental-images/${auth.currentUser.uid}/${uniqueImageName}`,
      );
      const uploadTask = uploadBytesResumable(storageRef, resizedImage);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        error => {
          console.error('Error uploading the image:', error);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setLoading(false);
          setProgress(0);
          let newImageURLs = imageURLs;
          if (imageURLs.length < 5) {
            newImageURLs.push(downloadURL);
            setImageURLs(newImageURLs);
            console.log('newImageURLs: ', newImageURLs);
          }
          console.log('downloadURL: ', downloadURL);
          console.log('imageURLs: ', imageURLs);
        },
      );
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const rentalItem = {
      images: imageURLs,
      price: parseFloat(price),
      description,
      timeLimit,
      listDate,
      timeOfListing: new serverTimestamp(),
      sellerId: auth.currentUser.uid,
    };

    await addDoc(collection(db, 'rentalItems'), rentalItem);

    setImages([]);
    setImageURLs([]);
    setPrice('');
    setDescription('');
    setTimeLimit('');
    setListDate('');
    setCategory('');
  };

  return (
    <div className="rent-item">
      <h1>Create Rental Listing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Upload Images (up to 5):
          <input type="file" multiple onChange={handleImageUpload} />
        </label>
        <div className="uploaded-images">
          {imageURLs.map((url, index) => (
            <img key={index} src={url} alt={`uploaded-${index}`} />
          ))}
        </div>
        <br />
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time Limit (hours):
          <input
            type="number"
            value={timeLimit}
            onChange={e => setTimeLimit(e.target.value)}
          />
        </label>
        <br />
        <label>
          List Date:
          <input
            type="date"
            value={listDate}
            onChange={e => setListDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
};

export default SellPage;
