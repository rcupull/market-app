import { Table } from 'components/table';

export const DashboardPosts = () => {
  return (
    <div>
      <Table
        heads={[]}
        getRowProps={() => ({
          nodes: [],
        })}
        data={[]}
      />
    </div>
  );
};
