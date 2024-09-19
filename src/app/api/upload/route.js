import { storage } from '@/libs/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Busboy from 'busboy';

// Disable body parsing to handle file uploads manually
export const config = {
  api: {
    bodyParser: false,
  },
};

// Upload image to Firebase storage and return the download URL
const uploadFile = async (fileBuffer, filename) => {
  const fileRef = ref(storage, `images/${filename}`);
  const uploadTask = await uploadBytesResumable(fileRef, fileBuffer);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
};

// Parse multipart form data using Busboy
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: req.headers });
    const uploadedFiles = [];

    busboy.on('file', (fieldname, file, filename) => {
      const fileBuffers = [];
      file.on('data', (data) => {
        fileBuffers.push(data);
      });
      file.on('end', async () => {
        const fileBuffer = Buffer.concat(fileBuffers);
        try {
          const downloadURL = await uploadFile(fileBuffer, filename);
          uploadedFiles.push({
            filename,
            downloadURL,
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    busboy.on('finish', () => {
      resolve(uploadedFiles);
    });

    req.pipe(busboy);
  });
};

// Handle the POST request to upload the image
export async function POST(req) {
  try {
    const uploadedFiles = await parseForm(req);
    return new Response(JSON.stringify({ message: 'Files uploaded successfully', files: uploadedFiles }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error uploading files' }), { status: 500 });
  }
}
