import { useNavigate } from "react-router-dom";
import UserIcon from "@/assets/user.svg";
import commentIcon from "@/assets/comment.svg";
import rightArrow from "@/assets/right-arrow.svg";

export type BlogCommentType = {
  commentId: string;
};

export type BlogType = {
  creator: string;
  comments: BlogCommentType[];
  title: string;
  summary: string;
  data: string;
  id: number;
  coverImageUrl: string;
};

const BlogCard = ({ blog }: { blog: BlogType }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div>
      <div className="blog-card-wrapper w-full border border-[#D3D3D3] ">
        <div className="img w-full h-[240px] md:h-[340px] relative bg-gray-300">
          <img
            className="h-full w-full"
            src={blog.coverImageUrl}
            alt={`${blog.title} image`}
          />
        </div>
        <div className="p-[24px]">
          <div className="short-data flex space-x-9 items-center mb-3">
            <div className="flex space-x-1.5 items-center">
              <span>
                <img src={UserIcon} alt="user" />
              </span>
              <span className="text-xs md:text-base text-qgraytwo capitalize">
                By {blog.creator || "Admin"}
              </span>
            </div>
            <div className="flex space-x-1.5 items-center">
              <span>
                <img src={commentIcon} alt="comment" />
              </span>
              <span className="text-xs md:text-base text-qgraytwo">
                {blog?.comments?.length || 0} Comments
              </span>
            </div>
          </div>
          <div className="details">
            <h1 className="text-lg md:text-xl text-qblack hover:text-main font-semibold line-clamp-2 mb-1 capitalize">
              {blog.title}
            </h1>
            <p className="text-gray-500 text-xs md:text-base leading-[30px] line-clamp-2 mb-3">
              {blog.summary}
            </p>

            <div onClick={handleViewMore} className="cursor-pointer">
              <div className="flex items-center space-x-2 hover:underline text-main">
                <span className="text-qblack text-xs md:text-base font-semibold">
                  View More
                </span>
                <span>
                  <img src={rightArrow} alt="arrow" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
