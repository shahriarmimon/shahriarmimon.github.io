# Shahriar Mannan Imon Talukder | Academic Portfolio

Personal academic website for **Shahriar Mannan Imon Talukder**, hosted via GitHub Pages at [https://shahriarmimon.github.io](https://shahriarmimon.github.io).

## Pages

- **`index.html`**: Home (About, Research Vision, Research Interests, Awards & Honors Carousel)
- **`education.html`**: Education (B.Sc. in Agriculture at IUBAT)
- **`projects.html`**: Active and Previous Research Projects
- **`publications.html`**: Peer-Reviewed Journal Articles
- **`experience.html`**: Research & Organizational Experience
- **`blog.html`**: Markdown-powered Blog & Research Notes
- **`contact.html`**: Contact Information & CV Request

## How to Add a New Blog Post

1. Create a new `.md` file inside the `posts/` folder (for example, `posts/my-new-post.md`) and write your article using standard Markdown (`## Headings`, `**bold**`, lists, blockquotes, images).
2. Add an entry at the top of `posts/posts.json`:
   ```json
   {
     "slug": "my-new-post",
     "title": "Your Post Title",
     "date": "November 1, 2026",
     "category": "Plant Biology",
     "summary": "A short 1-2 sentence preview shown on the blog page."
   }
   ```
3. Commit and push to GitHub.
