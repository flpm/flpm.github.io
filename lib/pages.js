import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dataDirectory = path.join(process.cwd(), "data", "pages");

export async function getAllPageIds() {
  const fileNames = fs.readdirSync(dataDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        page: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPageData(page) {
  const fullPath = path.join(dataDirectory, `${page}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    page,
    ...matterResult.data,
    content: matterResult.content,
  };
}
