import { Table } from '.';

export default {
  component: Table,
};

const node1 = (
  <div className="flex items-center">
    <div className="flex-shrink-0 w-10 h-10">
      <img
        className="w-10 h-10 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
        alt=""
      />
    </div>

    <div className="ml-4">
      <div className="text-sm font-medium leading-5 text-gray-900">John Doe</div>
      <div className="text-sm leading-5 text-gray-500">john@example.com</div>
    </div>
  </div>
);

const node2 = (
  <>
    <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
    <div className="text-sm leading-5 text-gray-500">Web dev</div>
  </>
);

const node3 = (
  <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
    Active
  </span>
);

export const Default = (): JSX.Element => {
  return (
    <>
      <Table
        data={[{}, {}, {}, {}, {}, {}]}
        heads={['Name', 'Title', 'Status', 'Role']}
        getRowProps={() => ({
          nodes: [
            node1,
            node2,
            node3,
            'Owner',
            <a key={0} href="#" className="text-indigo-600 hover:text-indigo-900">
              Edit
            </a>,
          ],
        })}
      />
    </>
  );
};
