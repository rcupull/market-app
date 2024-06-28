export interface CloudflareImage {
  id: string;
  filename: string;
  requireSignedURLs: boolean;
  variants: Array<string>;
  uploaded: string;
}

export interface CloudflareCDNUploadResponse {
  success: boolean;
  errors: Array<{
    code: number;
    message: string;
  }>;
  result: CloudflareImage;
}

export interface CloudflareCDNListResponse {
  success: boolean;
  errors: Array<{
    code: number;
    message: string;
  }>;
  result: {
    images: Array<CloudflareImage>;
  };
}
