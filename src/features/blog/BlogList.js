import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectBlog } from './blogSlice';

const BlogList = ({ title }) => {

  let blogs$ = null;

  blogs$ = useSelector(selectBlog);

  return (
    <div className="bloglist">
      <h2>{title}</h2>
      {blogs$ && blogs$.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;