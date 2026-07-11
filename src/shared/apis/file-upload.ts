import axios from 'axios';

import type { components } from '../types/schema';
import apiInstance from './instance';
import type { ApiResponse } from './types';
import { unwrapDataResponse } from './unwrap';

type PresignedUploadUrlRequest = components['schemas']['PresignedUploadUrlRequest'];
type PresignedUploadUrlResponse = components['schemas']['PresignedUploadUrlResponse'];
type UploadDomain = PresignedUploadUrlRequest['domain'];

// presigned URL 발급
const createUploadUrl = async(
  body: PresignedUploadUrlRequest, 
): Promise<PresignedUploadUrlResponse> => {
  const res = await apiInstance.post<ApiResponse<PresignedUploadUrlResponse>>(
    '/files/presigned-url',
    body,
  );
  return unwrapDataResponse(res);
}

export const uploadImage = async (
  file: File,
  domain: UploadDomain,
): Promise<string> => {
  const { presignedUrl, accessUrl} = await createUploadUrl({
    fileName: file.name,
    contentType: file.type,
    domain,
  })
  if(!presignedUrl || !accessUrl) {
    throw new Error('업로드 URL 발급에 실패했어요')
  }
  await axios.put(presignedUrl, file, {
    headers: {'Content-Type': file.type},
  });
  return accessUrl;
}