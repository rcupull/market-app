import { useFormField } from 'components/formux/useFormField';

export interface FormikWrapperProps {
  children: (args: ReturnType<typeof useFormField<any>>) => React.ReactNode;
}
export const FormikWrapper = ({ children, ...props }: FormikWrapperProps) => {
  const args = useFormField<any>(props);

  return <>{children(args)}</>;
};
