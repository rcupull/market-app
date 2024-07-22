global.structuredClone = (json) => JSON.parse(JSON.stringify(json));

global.beforeAll(async () => {
  global.DEVELOPMENT = true;
});

global.afterAll(async () => {});

global.afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
  jest.resetAllMocks();
});

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
  useSwiper: () => ({
    swiper: {
      slideNext: () => {},
    },
  }),
}));

jest.mock("swiper/css", () => ({
  default: jest.fn(),
}));

jest.mock("swiper/modules", () => ({
  Autoplay:jest.fn(),
  Navigation:jest.fn(),
}));

jest.mock("swiper/css/navigation", () => ({
  default: jest.fn(),
}));

jest.mock("swiper", () => ({
  default: jest.fn(),
  Thumbs: jest.fn()
}));

jest.mock("ckeditor5-build/build/ckeditor", () => ({
  default: jest.fn(),
}));

global.ResizeObserver = class FakeResizeObserver {
  observe() {}
  disconnect() {}
}