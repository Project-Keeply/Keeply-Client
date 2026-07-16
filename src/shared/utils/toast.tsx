import ToastCard from '@shared/components/ToastCard';
import { toast } from 'sonner';

export const showErrorToast = (message: string) => {
  toast.custom(() => <ToastCard message={message} />);
};
