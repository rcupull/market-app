import { useFormField } from 'components/formux/useFormField';

export interface FormikWrapperProps {
  children: (args: ReturnType<typeof useFormField>) => React.ReactNode;
}
export const FormikWrapper = ({ children, ...props }: FormikWrapperProps) => {
  const args = useFormField(props);

  return <>{children(args)}</>;
};
