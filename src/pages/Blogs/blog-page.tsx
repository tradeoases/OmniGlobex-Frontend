import { PageHeader } from "@/components/PageHeader";
import BlogCard, { BlogType } from "@/pages/Blogs/components/blog-card";
import request from "@/service/base.service";
import { useQuery } from "@tanstack/react-query";

const BlogPage = () => {
  const {
    data: blogs,
    isPending,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const blogsReq = await request.get("content/");
      if (blogsReq.status === 200) {
        return blogsReq.data.data;
      }
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64 w-screen">
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }


  return (
    <div className="w-full">
      <PageHeader name="Our Blogs" route="/ blogs" />

      <div className="w-10/12 xl:w-8/12 mx-auto my-14">
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 ">
          {isSuccess &&
            blogs.map((blog: BlogType) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
