import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import dotenv from "dotenv";
dotenv.config();

// Obtener la cadena de conexión desde la variable de entorno
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("Falta la variable de entorno AZURE_STORAGE_CONNECTION_STRING");
}

// Obtener el cliente del servicio de blobs
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

// Obtener el cliente del contenedor
const containerClient = blobServiceClient.getContainerClient("images");

// Crear el contenedor si no existe
async function createContainer() {
  const doesContainerExist = await containerClient.exists();
  if (!doesContainerExist) {
    await containerClient.create();
  }
}

// Subir una imagen al contenedor
async function uploadBlob(localPath: string, blobName: string) {
  await createContainer(); // Asegúrate de que el contenedor exista

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(localPath);
}

// Ejemplo de uso
async function main() {
  await uploadBlob("C:/Users/edual/OneDrive/Fotos/Capturas de pantalla/Captura de pantalla 2023-07-30 195218.png", "imagen.jpg");
  console.log("Imagen subida correctamente");
}

main().catch((error) => {
  console.error("Error al subir la imagen:", error);
});
