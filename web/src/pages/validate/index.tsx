import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import { Button } from 'components/button';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useAuthValidate } from 'features/api/auth/useAuthValidate';

import { useRouter } from 'hooks/useRouter';

import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';

export const Validate = () => {
  const { params } = useRouter();

  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [email, setEmail] = useState('');
  const authSignInModal = useAuthSignInModal();

  const { authValidate } = useAuthValidate();

  const { code } = params;

  useEffect(() => {
    if (code) {
      authValidate.fetch(
        { code },
        {
          onAfterSuccess: ({ email }) => {
            setEmail(email);
            setStatus('success');
          },
          onAfterFailed: () => {
            setStatus('error');
          },
        },
      );
    }
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-around h-96">
      {status === 'pending' && (
        <>
          <SpinnerEllipsis />

          <span className="text-2xl font-semibold">Activando cuenta</span>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircleIcon className="size-20 bg-green-100 text-green-500 rounded-full p-1" />

          <span className="text-2xl font-semibold">Cuenta activada</span>

          <Button
            label="Iniciar sesión"
            onClick={() => authSignInModal.open({ email, redirect: '/' })}
            className="!mt-8 !text-lg"
          />
        </>
      )}

      {status === 'error' && (
        <>
          <ExclamationTriangleIcon className="size-20 bg-red-100 text-red-500 rounded-full p-1" />

          <span className="text-2xl font-semibold w-96 text-center">
            Error en la activación. Asegurese de haber usado el enlace correcto. Si el problema
            persiste contacte con nuestro equipo de soporte.
          </span>
        </>
      )}
    </div>
  );
};
