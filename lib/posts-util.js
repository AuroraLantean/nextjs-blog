import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

// process.cwd() ... get repo folder
const postsDirectory = path.join(process.cwd(), 'markdown');

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

//used in pages/posts/[slug].js to get posts via slug
export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  //postIdentifier is the full markdown filename OR slug
  //if it is a filename, remove the file extension. Make sure your filename is the slug, and does not contain special characters or white space!

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  ); // the latest goes to the top

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
