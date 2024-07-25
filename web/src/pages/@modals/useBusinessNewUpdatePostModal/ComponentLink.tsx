import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldPostLink } from 'components/field-post-link';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';
import { IconButtonAdd } from 'components/icon-button-add';

import { useUpdateBusinessSection } from 'features/api/business/useUpdateBusinessSection';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useAddOnePost } from 'features/api/posts/useAddOnePost';
import { useUpdateOnePost } from 'features/api/posts/useUpdateOnePost';
import { useCloseContext } from 'features/modal/components/emergent/closeContext/useCloseContext';

import { useMemoizedHash } from 'hooks/useMemoizedHash';
import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';
import { useBusinessNewUpdateSectionModal } from '../useBusinessNewUpdateSectionModal';

import { imagesDimensions } from 'constants/posts';
import { StyleProps } from 'types/general';
import { LinkFormState, Post } from 'types/post';
import { getRequiredLabel } from 'utils/form';
import { addStringToUniqueArray } from 'utils/general';

export interface ComponentLinkProps extends StyleProps {
  portal: Portal;
  post?: Post;
  onAfterSuccess: () => void;
}

export const ComponentLink = ({ portal, onAfterSuccess, post, className }: ComponentLinkProps) => {
  const { business, onFetch, getSections } = useBusiness();

  const { updateBusinessSection } = useUpdateBusinessSection();
  const { businessNewUpdateSectionModal } = useBusinessNewUpdateSectionModal();
  const { addOnePost } = useAddOnePost();
  const { updateOnePost } = useUpdateOnePost();
  const { addManyImages } = useAddManyImages();

  const updateLinkInSections = async (
    sectionIds: Array<string>,
    linkTag: string
  ): Promise<void> => {
    if (!business) return;

    if (sectionIds.length) {
      const promises = getSections({ ids: sectionIds }).map((section) => {
        return new Promise<void>((resolve) => {
          if (!section) {
            return resolve();
          }

          updateBusinessSection.fetch(
            {
              routeName: business.routeName,
              sectionId: section._id,
              data: {
                postCategoriesTags: addStringToUniqueArray(
                  section.postCategoriesTags || [],
                  linkTag
                ),
              },
            },
            {
              onAfterSuccess: () => {
                resolve();
              },
            }
          );
        });
      });

      await Promise.all(promises);
      onFetch({ routeName: business?.routeName });
    }
  };

  const linkTag = useMemoizedHash();

  const sections = getSections({
    tags: post?.postCategoriesTags || [],
  });

  const { onChangeUnsavedChanges } = useCloseContext();

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  return (
    <Formux<LinkFormState & { sectionIds: Array<string> }>
      value={{
        name: '',
        images: [],
        postCategoriesTags: [linkTag],
        postLink: undefined,
        sectionIds: sections.map((section) => section._id),
        ...(post || {}),
      }}
      validate={[
        {
          field: 'name',
          type: 'required',
        },
      ]}
    >
      {({ value, hasChange }) => {
        onChangeUnsavedChanges(hasChange);

        return (
          <form className={className}>
            <FieldInput name="name" label={getRequiredLabel('Nombre del enlace')} />
            <Divider />

            <FieldRadioGroup<{ label: string; value: string }>
              label={
                <div className="flex items-center">
                  Incluir en las secciones
                  <IconButtonAdd
                    title="Agregar nueva sección de enlaces"
                    className="text-green-600 font-bold ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      businessNewUpdateSectionModal.open({
                        postType: 'link',
                        onAfterSuccess: () =>
                          business && onFetch({ routeName: business.routeName }),
                      });
                    }}
                  />
                </div>
              }
              name="sectionIds"
              className="mt-6"
              items={getSections({ postType: 'link' }).map(({ name, _id }) => ({
                label: name,
                value: _id,
              }))}
              renderOption={({ checked, item }) => {
                return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
              }}
              optionToValue={({ value }) => value}
              multi
            />
            <Divider />

            <FieldPostLink name="postLink" className="mt-6" />
            <Divider />

            <FieldInputImages label="Imagen" id="images" name="images" className="mt-6" multi />
            <Divider />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={
                  addOnePost.status.isBusy ||
                  updateOnePost.status.isBusy ||
                  updateBusinessSection.status.isBusy ||
                  addManyImages.status.isBusy
                }
                formuxSubmit
                onClick={() => {
                  const { images, name, postCategoriesTags, sectionIds, postLink } = value;

                  const handelUpdatePost = (post: Post) => {
                    const { _id: postId } = post;

                    addManyImages.fetch(
                      {
                        images,
                        routeName,
                        postId,
                        userId: post.createdBy,
                        ...imagesDimensions.cardPost,
                      },
                      {
                        onAfterSuccess: (images) => {
                          updateOnePost.fetch(
                            {
                              postId,
                              images,
                              name,
                              postLink,
                            },
                            {
                              onAfterSuccess: async () => {
                                const [linkTag] = postCategoriesTags || [];
                                await updateLinkInSections(sectionIds, linkTag || '<unknow Tag>');

                                onAfterSuccess();
                              },
                            }
                          );
                        },
                      }
                    );
                  };
                  const handelAddPost = () => {
                    addOnePost.fetch(
                      {
                        name,
                        routeName,
                        postCategoriesTags,
                        images: [],
                        postType: 'link',
                        postLink,
                      },
                      {
                        onAfterSuccess: (response) => {
                          handelUpdatePost(response);
                        },
                      }
                    );
                  };

                  post ? handelUpdatePost(post) : handelAddPost();
                }}
                variant="primary"
                className="w-full"
              />
            )}
          </form>
        );
      }}
    </Formux>
  );
};

export default ComponentLink;
