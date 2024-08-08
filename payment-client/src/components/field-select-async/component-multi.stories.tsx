import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { FieldSelectAsync as FieldSelectAsyncMulti } from '.';

import { Post } from 'types/post';
import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldSelectAsyncMulti
};

export const Default = (): JSX.Element => {
  const useCall = () => useGetAllPosts().getAllPosts;

  return (
    <FormikWrapper>
      <div className="flex gap-2 w-full">
        <FieldSelectAsyncMulti<Post>
          name="field"
          useCall={useCall}
          searchToArgs={(search) => ({ search })}
          renderOption={({ name }) => name}
          multi
          className="w-full"
        />
        <FieldSelectAsyncMulti<Post>
          name="field"
          useCall={useCall}
          searchToArgs={(search) => ({ search })}
          renderOption={({ name }) => name}
          multi
          className="w-full"
        />
      </div>
    </FormikWrapper>
  );
};

export const WithOptionToValue = (): JSX.Element => {
  const useCall = () => useGetAllPosts().getAllPosts;

  return (
    <FormikWrapper>
      <div className="flex gap-2 w-full">
        <FieldSelectAsyncMulti<Post>
          name="field"
          useCall={useCall}
          searchToArgs={(search) => ({ search })}
          renderOption={({ name }) => name}
          optionToValue={({ name }) => name}
          multi
          className="w-full"
        />
        <FieldSelectAsyncMulti<Post>
          name="field"
          useCall={useCall}
          searchToArgs={(search) => ({ search })}
          renderOption={({ name }) => name}
          optionToValue={({ name }) => name}
          multi
          className="w-full"
        />
      </div>
    </FormikWrapper>
  );
};
