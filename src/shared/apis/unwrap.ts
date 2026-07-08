import type { AxiosResponse } from 'axios';

import { ApiError} from './api-error'
import type { ApiResponse } from './types';

export const unwrapDataResponse = <T>(res: AxiosResponse<ApiResponse<T>>): T => {
  const {success, data, message} = res.data;

  if(!success || data == undefined){
    throw new ApiError(message ?? '요청에 실패했어요', res.status);
  }
  return data;
}