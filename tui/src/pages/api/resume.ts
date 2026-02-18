import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import config from '../../../config.json';

// Parse S3 bucket and key from config URL
// URL format: https://bucket-name.s3.region.amazonaws.com/key
const parseS3Url = (url: string) => {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  const key = urlObj.pathname.substring(1); // Remove leading slash

  // Extract bucket name and region from hostname
  const parts = hostname.split('.s3.');
  const bucket = parts[0];
  const region = parts[1]?.split('.')[0] || 'us-east-1';

  return { bucket, region, key };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bucket, region, key } = parseS3Url(config.resume_url);

    // Initialize S3 client
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    // Fetch the file from S3
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await s3Client.send(command);

    // Set appropriate headers
    res.setHeader('Content-Type', response.ContentType || 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="Aayush_Shah_Resume.pdf"',
    );
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    // Stream the file to the response
    if (response.Body) {
      const stream = response.Body as any;

      // Convert the stream to buffer and send
      const chunks: Uint8Array[] = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      res.status(200).send(buffer);
    } else {
      throw new Error('No file content received from S3');
    }
  } catch (error: any) {
    console.error('Error fetching resume from S3:', error);

    // Provide helpful error messages
    if (error.name === 'NoSuchKey') {
      return res.status(404).json({ error: 'Resume file not found' });
    }

    if (
      error.name === 'CredentialsError' ||
      error.message?.includes('credentials')
    ) {
      return res.status(500).json({
        error:
          'AWS credentials not configured. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.',
      });
    }

    return res.status(500).json({
      error: 'Failed to fetch resume',
      message: error.message,
    });
  }
}
