import { FieldSelect, FieldSelectProps } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldSelect,
};

interface Person {
  id: number;
  name: string;
  avatar: string;
}

const people: Array<Person> = [
  {
    id: 1,
    name: 'Wade Cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Arlene Mccoy',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Devon Webb',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Tom Cook',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Tanya Fox',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 6,
    name: 'Hellen Schmidt',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 7,
    name: 'Caroline Schultz',
    avatar:
      'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Mason Heaney',
    avatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Claudie Smitham',
    avatar:
      'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Emil Schaefer',
    avatar:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldSelect<Person>
      items={people}
      name="field"
      renderOption={({ avatar, name }) => (
        <>
          <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
          <span className="ml-3">{name}</span>
        </>
      )}
      renderValue={({ avatar, name }) => (
        <>
          <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
          <span className="ml-3">{name}</span>
        </>
      )}
    />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldSelect<Person>
      items={people}
      label="Label"
      name="field"
      renderOption={({ avatar, name }) => (
        <>
          <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
          <span className="ml-3">{name}</span>
        </>
      )}
      renderValue={({ avatar, name }) => (
        <>
          <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
          <span className="ml-3">{name}</span>
        </>
      )}
    />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <FieldSelect<Person>
      items={people}
      label="Label"
      name="field"
      renderOption={({ avatar, name }) => (
        <>
          <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
          <span className="ml-3">{name}</span>
        </>
      )}
      renderValue={({ avatar, name }) => (
        <>
          <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
          <span className="ml-3">{name}</span>
        </>
      )}
    />
  </FormikWrapper>
);

// export const Label = (): JSX.Element => {
//   const [value, setValue] = useState<Person>();

//   return (
//     <Select<Person>
//       label="Personas"
//       items={people}
//       value={value}
//       onChange={setValue}
//       renderOption={({ avatar, name }) => (
//         <>
//           <img
//             src={avatar}
//             alt=""
//             className="h-5 w-5 flex-shrink-0 rounded-full"
//           />
//           <span className="ml-3">{name}</span>
//         </>
//       )}
//       renderValue={({ avatar, name }) => (
//         <>
//           <img
//             src={avatar}
//             alt=""
//             className="h-5 w-5 flex-shrink-0 rounded-full"
//           />
//           <span className="ml-3">{name}</span>
//         </>
//       )}
//     />
//   );
// };

// export const Error = (): JSX.Element => {
//   const [value, setValue] = useState<Person>();

//   return (
//     <Select<Person>
//       label="Personas"
//       error={'valor incorrecto'}
//       items={people}
//       value={value}
//       onChange={setValue}
//       renderOption={({ avatar, name }) => (
//         <>
//           <img
//             src={avatar}
//             alt=""
//             className="h-5 w-5 flex-shrink-0 rounded-full"
//           />
//           <span className="ml-3">{name}</span>
//         </>
//       )}
//       renderValue={({ avatar, name }) => (
//         <>
//           <img
//             src={avatar}
//             alt=""
//             className="h-5 w-5 flex-shrink-0 rounded-full"
//           />
//           <span className="ml-3">{name}</span>
//         </>
//       )}
//     />
//   );
// };

export const ControlledComponent = (): JSX.Element => {
  const selectProps: FieldSelectProps<Person> = {
    items: people,
    name: 'fieldSimple',
    renderOption: ({ avatar, name }) => (
      <>
        <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
        <span className="ml-3">{name}</span>
      </>
    ),
    renderValue: ({ avatar, name }) => (
      <>
        <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
        <span className="ml-3">{name}</span>
      </>
    ),
  };

  return (
    <FormikWrapper>
      <div className="flex w-screen">
        <FieldSelect<Person> {...selectProps} className="w-96" label="Simple" />
        <FieldSelect<Person> {...selectProps} className="w-96" label="Simple" />
      </div>

      <div className="flex w-screen mt-7">
        <FieldSelect<Person>
          {...selectProps}
          name="fieldMulti"
          className="w-96"
          label="Multi"
          multi
          renderValue={({ avatar }) => (
            <>
              <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
            </>
          )}
        />
        <FieldSelect<Person>
          {...selectProps}
          name="fieldMulti"
          className="w-96"
          label="Multi"
          multi
          renderValue={({ avatar }) => (
            <>
              <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
            </>
          )}
        />
      </div>
    </FormikWrapper>
  );
};

export const ControlledComponentWithOptionValue = (): JSX.Element => {
  const selectProps: FieldSelectProps<Person> = {
    items: people,
    name: 'fieldSimple',
    renderOption: ({ avatar, name }) => (
      <>
        <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
        <span className="ml-3">{name}</span>
      </>
    ),
    renderValue: ({ avatar, name }) => (
      <>
        <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
        <span className="ml-3">{name}</span>
      </>
    ),
    optionToValue: ({ id }) => id,
  };

  return (
    <FormikWrapper>
      <div className="flex w-screen">
        <FieldSelect<Person> {...selectProps} className="w-96" label="Simple" />
        <FieldSelect<Person> {...selectProps} className="w-96" label="Simple" />
      </div>

      <div className="flex w-screen mt-7">
        <FieldSelect<Person>
          {...selectProps}
          name="fieldMulti"
          className="w-96"
          label="Multi"
          multi
          renderValue={({ avatar }) => (
            <>
              <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
            </>
          )}
        />
        <FieldSelect<Person>
          {...selectProps}
          name="fieldMulti"
          className="w-96"
          label="Multi"
          multi
          renderValue={({ avatar }) => (
            <>
              <img src={avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
            </>
          )}
        />
      </div>
    </FormikWrapper>
  );
};
