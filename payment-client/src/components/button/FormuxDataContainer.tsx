import { FormContextState } from 'components/formux/types';
import { useForm } from 'components/formux/useForm';

export interface FormuxDataContainerProps {
  children: (args: FormContextState) => React.ReactNode;
}
export const FormuxDataContainer = ({ children }: FormuxDataContainerProps) => {
  const formState = useForm();

  return <>{children(formState)}</>;
};
