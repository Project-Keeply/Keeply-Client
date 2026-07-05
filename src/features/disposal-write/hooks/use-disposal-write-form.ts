/**
 * 폐기관리 글쓰기 폼 로직 훅
 * - useForm + zodResolver 를 구성하고 필드 상태 / 유효성 / 제출 핸들러를 캡슐화한다.
 * - 제출 시 payload 를 조립해 API 로 전송한다. (뷰는 이 훅의 반환값만 사용)
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  type DisposalWriteFormValues,
  disposalWriteSchema,
} from '../schemas/disposal-write-schema';

const useDisposalWriteForm = () => {
  const { control, handleSubmit, formState } = useForm<DisposalWriteFormValues>({
    resolver: zodResolver(disposalWriteSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: undefined,
      date: '',
    },
  });

  const submit = handleSubmit((values) => {
    // TODO: API 연동 (values 로 payload 조립 후 전송)
    console.log(values);
  });
    return { control, isVaild: formState.isValid, submit };
};

export default useDisposalWriteForm;