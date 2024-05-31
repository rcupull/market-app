import { Route, Routes } from 'react-router-dom';

import { dynamic } from 'utils/makeLazy';

const Home = dynamic(() => import('./routes/home').then((m) => m));
const PostId = dynamic(() => import('./routes/postId').then((m) => m));

export interface PostsProps {
  routeName: string;
}

export const Posts = ({ routeName }: PostsProps) => {
  return (
    <Routes>
      <Route path="/" element={<Home routeName={routeName} />} />
      <Route path=":postId" element={<PostId routeName={routeName} />} />
    </Routes>
  );
};

export default Posts;
