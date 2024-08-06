import { Request, Response } from 'express';
import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient('images');

// Configuración de multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadFile(req: Request, res: Response) {
  try {
    // Verifica si el archivo fue enviado
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const file = req.file;
    const blobName = file.originalname; // Nombre del archivo
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Sube el archivo al contenedor de blobs
    await blockBlobClient.upload(file.buffer, file.buffer.length);

    res.status(200).send('File uploaded successfully');
    console.log(blockBlobClient.url);
    
    return blockBlobClient.url
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal Server Error');
  }
}

export default {
  uploadFile
};
