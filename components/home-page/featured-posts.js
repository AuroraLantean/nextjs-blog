//import PostsGrid from '../posts/posts-grid';
//<PostsGrid posts={props.posts} />
import classes from './featured-posts.module.css';

function FeaturedPosts(props) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
    </section>
  );
}

export default FeaturedPosts;
