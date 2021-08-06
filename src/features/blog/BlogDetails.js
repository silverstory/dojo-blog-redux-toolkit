import { useParams, useHistory } from "react-router-dom";
import useFetch from "../../app/useFetch";
import { useSelector } from 'react-redux';
import { selectBlog } from './blogSlice';
import { useDispatch } from "react-redux";
import { setblogs } from "./blogSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`);
  const history = useHistory();
  
  let blog$ = null;
  
  const dispatch = useDispatch();

  dispatch(setblogs(blog));

  blog$ = useSelector(selectBlog);

  const handleClick = () => {
    fetch('http://localhost:8000/blogs/' + blog$.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    })
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog$ && (
        <article>
          <h2>{ blog$.title }</h2>
          <p>Written by { blog$.author } </p>
          <div>{ blog$.body }</div>
          <button  onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;