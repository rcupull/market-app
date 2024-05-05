import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { IconButtonUpdate } from 'components/icon-button-update';
import { IconUpdate } from 'components/icon-update';
import { Modal } from 'components/modal';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useGetOnePost } from 'features/api/posts/useGetOnePost';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { usePortal } from 'hooks/usePortal';

import { PostForm } from './PostForm';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdatePostForm } from 'pages/@modals/useBusinessUpdatePostForm';

export interface PostNewProps {
  postId?: string; //only user to update a post
  callAfarResources?: CallAfarResources;
}

export const PostNew = ({ postId, callAfarResources }: PostNewProps) => {
  const portal = usePortal();
  const { onClose } = useModal();

  const businessUpdatePostForm = useBusinessUpdatePostForm();

  const { onCallAfar } = useCallFromAfar();
  const onRefresh = () => onCallAfar(callAfarResources);

  const onAfterSuccess = () => {
    onRefresh();
    onClose();
  };

  const { getOnePost } = useGetOnePost();
  const { business, onFetch, status } = useBusiness();

  useEffect(() => {
    if (postId) {
      getOnePost.fetch({ id: postId });
    }
  }, []);

  const getContent = () => {
    if (getOnePost.status.isBusy || status.isBusy) {
      return (
        <div className="h-40 flex justify-center items-center">
          <SpinnerEllipsis />
        </div>
      );
    }

    if (!business) {
      return <></>;
    }

    return (
      <PostForm
        business={business}
        portal={portal}
        onAfterSuccess={onAfterSuccess}
        post={getOnePost.data}
      />
    );
  };

  const getEditFormbutton = () => {
    const handleClick = () => {
      businessUpdatePostForm.open({
        onAfterSuccess: () => {
          if (!business) return;
          onFetch({ routeName: business.routeName });
        },
      });
    };
    return (
      <>
        <Button
          variant="link"
          svg={IconUpdate}
          label="Editar campos del formulario"
          onClick={handleClick}
          className="hidden sm:flex"
        />
        <IconButtonUpdate
          title="Editar campos del formulario"
          onClick={handleClick}
          className="block sm:hidden"
        />
      </>
    );
  };
  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          {postId ? 'Editar publicación' : 'Nueva publicación'}
          {getEditFormbutton()}
        </div>
      }
      content={getContent()}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={portal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
