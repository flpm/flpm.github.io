import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dataDirectory = path.join(process.cwd(), "data");

const readFolder = (folder) => {
  let files = [];
  fs.readdirSync(folder).forEach((file) => {
    const absolute = path.join(folder, file);
    if (fs.statSync(absolute).isDirectory()) {
      files = files.concat(readFolder(absolute));
    } else files.push(absolute);
  });
  return files.map((file) => file.replace(/\.md$/, ""));
};

export async function getAllPageIds() {
  const fileNames = readFolder(dataDirectory).map((file) =>
    file.split("/").slice(process.cwd().split("/").length + 1)
  );

  return fileNames.map((fileName) => {
    return {
      params: {
        page: fileName,
      },
    };
  });
}

export async function getPageData(page) {
  const filename = page.join("/") + ".md";
  const fullPath = path.join(dataDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    page,
    ...matterResult.data,
    content: matterResult.content,
  };
}
