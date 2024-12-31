import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import request from "@/service/base.service";
import commentIcon from "@/assets/comment.svg";
import UserIcon from "@/assets/user.svg";

const BlogDetails = () => {
  const { id } = useParams();

  const {
    data: blog,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const blogReq = await request.get(`content/${id}`);
      if (blogReq.status === 200) {
        return blogReq.data.data;
      }
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64 w-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="blog-details-wrapper max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="img h-[340px] bg-gray-300 rounded-lg overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={blog?.coverImageUrl}
          alt={`${blog?.title} image`}
        />
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog?.title}</h1>
        <div className="short-data flex space-x-9 items-center mb-5 text-gray-600">
          <span className="flex items-center space-x-2">
            <span>
              <img src={UserIcon} alt="user" />
            </span>
            <span>By {blog?.creator || "Admin"}</span>
          </span>

          <span className="flex items-center space-x-2">
            <span>
              <img src={commentIcon} alt="comment" />
            </span>
            <span>{blog?.comments?.length || 0} Comments</span>
          </span>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {blog?.data}
        </p>

        <button
          className="text-white bg-main px-5 py-2 rounded-lg hover:bg-yellow-500 transition-all"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
