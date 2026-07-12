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

  const { control, handleSubmit, formState } =
    useForm<AnnouncementWriteFormValues>({
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
