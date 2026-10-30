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

## Writing Blog Posts (Admin Panel)

Blog posts are managed through the admin panel at **https://shahriarmimon.github.io/admin/** (powered by [Sveltia CMS](https://github.com/sveltia/sveltia-cms)).

1. Open /admin/ and choose **Sign In with Token**, then paste a fine-grained GitHub token (this repo only, **Contents: Read and write**).
2. **Blog Posts** > **New Post**: write in the editor, pick a category, add tags, a summary, and an optional cover image.
3. Toggle **Draft** to keep a post hidden, or leave it off and click **Publish**.
4. Manage the category list under **Settings** > **Blog Categories**.

Every publish commits to `main`. The GitHub Action in `.github/workflows/deploy.yml` runs `scripts/build-posts.mjs` to rebuild `posts/posts.json` and `sitemap.xml` (drafts excluded) and deploys the site in about a minute.

### File layout
- `posts/*.md`: one Markdown file per post, with YAML front matter (`title`, `date`, `category`, `tags`, `summary`, `cover`, `draft`)
- `data/categories.json`: category list
- `Images/blog/`: uploaded blog images
- `posts/posts.json` and `sitemap.xml`: generated automatically, do not edit by hand