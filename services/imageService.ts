import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const containerName = 'images';

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

async function createContainerIfNotExists() {
  const doesContainerExist = await containerClient.exists();
  if (!doesContainerExist) {
    await containerClient.create();
  }
}

export async function uploadImageToBlob(fileBuffer: Buffer, blobName: string) {
  await createContainerIfNotExists();

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.upload(fileBuffer, fileBuffer.length);

  return {
    url: blockBlobClient.url,
    blobName
  };
}
