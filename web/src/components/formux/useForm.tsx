import { useContext } from 'react';

import { FormContext } from './context';

export const useForm = () => useContext(FormContext);
