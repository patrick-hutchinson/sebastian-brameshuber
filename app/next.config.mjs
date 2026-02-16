/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["cdn.sanity.io", "image.mux.com"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/films",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
