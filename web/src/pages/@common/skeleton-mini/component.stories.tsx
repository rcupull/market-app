import { SkeletonMini } from '.';

export default {
  component: SkeletonMini,
};

export const Default = () => <SkeletonMini />;

export const Banner = () => <SkeletonMini type="banner" />;

export const Footer = () => <SkeletonMini type="footer" />;

export const Posts = () => <SkeletonMini type="posts" />;

export const Search = () => <SkeletonMini type="search" />;
