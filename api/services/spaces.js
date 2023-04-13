import * as dotenv from 'dotenv'
dotenv.config()

const {
    DO_SPACES_ENDPOINT,
    DO_SPACES_KEY,
    DO_SPACES_SECRET,
    DB,
    DO_SPACES_NAME,
    ASSET_DIRECTORY
} = process.env;

import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';


// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
    endpoint: DO_SPACES_ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: "sgp1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
        accessKeyId: DO_SPACES_KEY, // Access key pair. You can create access key pairs using the control panel or API.
        secretAccessKey: DO_SPACES_SECRET // Secret access key defined through an environment variable.
    }
});

export function createFile({ data = '', name = '', type = '', directory = '' } = {}) {

    return new Promise((resolve, reject) => {
        if (!data) reject("error - provide file data");
        if (!name) reject("error - provide file name");
        if (!type) reject("error - provide file type");
        if (!directory) reject("error - provide target directory");

        var params = {
            Body: data,
            Bucket: DO_SPACES_NAME,
            Key: `${ASSET_DIRECTORY}/${directory}/${name}`,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: type,
        };

        try {
            s3Client.send(new PutObjectCommand(params))
            resolve('successfully uploaded file!')
        } catch (error) {
            reject(error)
        }
    })

}

export function deleteFile(link = '') {

    return new Promise((resolve, reject) => {
        if (!link) reject("delete_file - provide key");
        var params = {
            Bucket: DO_SPACES_NAME,
            Key: `${DB}/${link}`,
        };

        try {
            s3Client.send(new DeleteObjectCommand(params));
            resolve('successfully deleted file!')
        } catch (err) {
            reject(err)
        }
    })

}

