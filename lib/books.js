import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { get } from "http";
import { th } from "date-fns/locale";

const bookshelfDataDirectory = path.join(process.cwd(), "bookshelf");
const bookDataDirectory = path.join(bookshelfDataDirectory, "books");
const listDataDirectory = path.join(bookshelfDataDirectory, "lists");

const readFolder = (folder) => {
  let files = [];
  fs.readdirSync(folder).forEach((file) => {
    const absolute = path.join(folder, file);
    if (fs.statSync(absolute).isDirectory()) {
      files = files.concat(readFolder(absolute));
    } else files.push(absolute);
  });
  return files;
};

export async function getAllIds(source = "books") {
  let sourceFolder;
  if (source == "books") {
    sourceFolder = bookDataDirectory;
  } else {
    sourceFolder = listDataDirectory;
  }
  const paths = readFolder(sourceFolder).map((file) =>
    getPathfromFilename(file)
  );
  console.log(paths);

  return paths.map((fileName) => {
    if (source == "lists") {
      return {
        params: {
          list: fileName,
        },
      };
    }
    return {
      params: {
        book: fileName,
      },
    };
  });
}

export async function getBookData(page) {
  const filename = page + ".md";
  const fullPath = path.join(bookDataDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    page,
    ...matterResult.data,
    content: matterResult.content,
  };
}

const loadOneFile = (filename) => {
  const matterResult = matter(fs.readFileSync(filename, "utf8"));
  if (matterResult == null) {
    console.log("matterResult is null");
    throw new Error("matterResult is null for " + filename);
  }
  return {
    path: getPathfromFilename(filename),
    ...matterResult.data,
    ...matterResult.content,
  };
};

const getPathfromFilename = (filename) => {
  return filename
    .replace(/\.md$/, "")
    .split("/")
    .slice(process.cwd().split("/").length + 2)[0];
};

export async function getAllBooks() {
  const filenames = readFolder(bookDataDirectory);
  return filenames.map(loadOneFile);
}

export async function getAllListIds() {
  const filenames = readFolder(listDataDirectory);
  return filenames.map(loadOneFile);
}

export async function getListData(list) {
  const filename = list + ".md";
  const fullPath = path.join(listDataDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  console.log(matterResult.data.items);

  let sections = [];
  if (matterResult.data.items == null) {
    console.log("matterResult.data.items is null");
  } else
    sections = matterResult.data.items.map((section) => {
      const bookData = section.books.map((bookFile) =>
        loadOneFile(path.join(bookDataDirectory, bookFile))
      );
      return {
        ...section,
        books: bookData,
      };
    });

  //console.log(sections);

  return {
    path: list,
    ...matterResult.data,
    content: matterResult.content,
    sections,
    // books: matterResult.data.items.map((x) =>
    //   loadOneFile(path.join(bookDataDirectory, x))
    // ),
  };
}
