import ReactMarkdown from 'react-markdown';
// import Image from 'next/image';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import PostHeader from './post-header';
import classes from './post-content.module.css';

const POST1 = {
  slug: 'getting-started-with-nextjs',
  title: 'getting-started-with-nextjs',
  image: 'getting-started-with-nextjs960.png',
  content: '# This is a first post',
  date: '2023-08-18',
};

function PostContent(props) {
  const { post } = props;

  /*
  const customRenderers = {
    img(image) {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    },
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
  */
  const imagePath = `/images/posts/${POST1.slug}/${POST1.image}`;
  //const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={POST1.title} image={imagePath} />
      <ReactMarkdown>{POST1.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
