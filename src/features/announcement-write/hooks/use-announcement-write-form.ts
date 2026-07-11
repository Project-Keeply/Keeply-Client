/**
 * 공지사항 글쓰기 폼 로직 훅
 * - useForm + zodResolver 를 구성하고 필드 상태 / 유효성 / 제출 핸들러를 캡슐화한다.
 * - 제출 시 payload 를 조립해 API 로 전송한다. (뷰는 이 훅의 반환값만 사용)
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTE_PATH } from '@shared/router/path';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  type AnnouncementWriteFormValues,
  announcementWriteSchema,
} from '../schemas/announcement-write-schema';
import useCreateAnnouncement from './use-create-announcement';

import { useMyGroup } from '@/entities/group';

const useAnnouncementWriteForm = () => {
  const navigate = useNavigate();
  const { groupId } = useMyGroup();
  const { mutate, isPending } = useCreateAnnouncement({ groupId });

  const { control, handleSubmit, formState } = useForm<AnnouncementWriteFormValues>({
    resolver: zodResolver(announcementWriteSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      tag: undefined,
      content: '',
    },
  });

  const submit = handleSubmit((values) => {
    mutate(values, {
      onSuccess: () => navigate(ROUTE_PATH.HOME),
    });
  });

  return { control, isValid: formState.isValid, isPending, submit };
};

export default useAnnouncementWriteForm;
