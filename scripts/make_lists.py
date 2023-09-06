from collections import defaultdict, Counter
from pathlib import Path
from itertools import accumulate
import frontmatter

bookshelf_folder = Path("./bookshelf")

book_folder = bookshelf_folder / "books"
list_folder = bookshelf_folder / "lists"

languages = defaultdict(list)
interests = defaultdict(set)

all_books = dict()
tag_map = defaultdict(dict)
tag_counter = Counter()
tag_to_theme = {
    "business": "business",  # 15
    "engineering": "engineering",  # 63
    "engineering.computer": "computer_engineering",  # 30
    "engineering.computer.security": "security",  # 18
    "engineering.computer.software": "software",  # 25
    "engineering.computer.software.programming_languages": "programming",  # 15
    "engineering.information": "data",  # 29
    "engineering.information.data.analysis": "data_analysis",  # 20
    "engineering.information.data.visualization": "visualization",  # 28
    "engineering.information.machine_learning": "machine_learning",  # 6
    "humanities": "humanities",  # 310
    "humanities.history": "history",  # 85
    "humanities.history.ancient": "ancient_history",  # 56
    "humanities.history.ancient.rome": "ancient_rome",  # 46
    "humanities.history.military": "military_history",  # 18
    "humanities.literature": "literature",  # 160
    "humanities.literature.fiction": "fiction",  # 150
    "humanities.literature.fiction.comic_books": "comic_books",  # 38
    "humanities.literature.fiction.crime": "crime_fiction",  # 22
    "humanities.literature.fiction.fantasy": "fantasy",  # 52
    "humanities.literature.fiction.scifi": "science_fiction",  # 6
    "humanities.literature.mythology": "mythologgy",  # 7
    "humanities.literature.non_fiction": "memoirs_and_essays",  # 34
    "humanities.literature.poetry": "poetry",  # 12
    "humanities.performing_arts": "performing_arts",  # 6
    "humanities.philosophy": "philosophy",  # 28
    "humanities.visual_arts": "visual_arts",  # 54
    "humanities.visual_arts.architecture": "architecture",  # 16
    "humanities.visual_arts.graphic_design": "graphic_design",  # 65
    "humanities.visual_arts.graphic_design.typography": "typography",  # 22
    "languages": "languages",  # 50
    "languages.english.grammar": "grammar",  # 26
    "languages.english.writing": "writting",  # 36
    "leisure.games": "games",  # 49
    "leisure.games.go": "go",  # 48
    "leisure.games.puzzles": "puzzles",  # 12
    "leisure.games.rpg": "roleplaying_games",  # 30
    "leisure.magic": "magic",  # 20
    "science": "science",  # 126
    "science.formal": "formal_science",  # 34
    "science.formal.mathematics": "math",  # 29
    "science.formal.mathematics.probability": "probability",  # 16
    "science.formal.statistics": "statistics",  # 26
    "science.social": "social_sciences",  # 90
    "science.social.archaeology": "archaeology",  # 26
    "science.social.design": "design",  # 33
    "science.social.economics": "economics",  # 8
    "science.social.linguistics": "linguistics",  # 22
    "science.social.psychology": "psychology",  # 59
    "science.social.sociology": "sociology",  # 8
    "self_development": "self_development",  # 18
}
themes = defaultdict(dict)


for file in book_folder.iterdir():
    if file.is_file():
        # open file, read frontmatter
        with open(file, "r") as f:
            data = frontmatter.load(f)

            # lists by language
            if len(data["language"]) > 4 and " " not in data["language"]:
                languages[data["language"]].append(data)
            all_books[data["asin"]] = data

            for tag in data["tags"]:
                for subtag in accumulate(tag.split("."), lambda x, y: x + "." + y):
                    tag_counter[subtag] += 1
                    tag_map[subtag][data["asin"]] = data
                tag_counter[tag] += 1

for language, books in languages.items():
    print(f"{language}: {len(books)} books")
    if len(language) > 4 and " " not in language:
        with open(list_folder / f"{language.lower()}.md", "w") as f:
            f.write("---\n")
            f.write(f"title: Books in {language}\n")
            f.write(f"items:\n")
            f.write(f"  - title: null\n")
            f.write(f"    books:\n")
            for book in books:
                f.write(f"     - {book['asin']}.md  # {book['title']}\n")
            f.write("---\n")


for tag, theme in tag_to_theme.items():
    content_theme = theme.replace("_", " ").title()
    with open(list_folder / f"{theme.lower()}.md", "w") as f:
        f.write("---\n")
        f.write(f"title: {content_theme} Books\n")
        f.write(f"items:\n")
        f.write(f"  - title: null\n")
        f.write(f"    books:\n")
        themes[theme] = (content_theme.lower(), len(tag_map[tag]))
        for entry in tag_map[tag].values():
            f.write(f"     - {entry['asin']}.md  # {entry['title']}\n")
        f.write("---\n")
        f.write("\n")


with open(list_folder / "by_subjects.md", "w") as f:
    f.write("---\n")
    f.write(f"title: Books by subject\n")
    f.write("---\n")
    f.write("\n")
    for theme, theme_data in sorted(themes.items(), key=lambda x: x[0]):
        f.write(
            f"- [{theme_data[0]}](/books/{theme_data[0].replace(' ', '_')}) ({theme_data[1]})\n"
        )

with open(list_folder / "by_languages.md", "w") as f:
    f.write("---\n")
    f.write(f"title: Books by language\n")
    f.write("---\n")
    f.write("\n")
    for lang, lang_list in sorted(languages.items(), key=lambda x: x[0]):
        f.write(f"- [{lang}](/books/{lang.lower()}) ({len(lang_list)})\n")


# for tag, books in tags.items():
#     print(f"{tag}: {len(books)} books")

#     with open(list_folder / f"{tag.lower()}.md", "w") as f:
#         f.write("---\n")
#         f.write(f"title: Books in {tag}\n")
#         f.write(f"items:\n")
#         f.write(f"  - title: null\n")
#         f.write(f"    books:\n")
#         for book in books:
#             f.write(f"     - {book['asin']}.md  # {book['title']}\n")
#         f.write("---\n")
#         f.write("\n")
#         f.write(f"Books about {tag}.\n")

# with open("tag_counter.txt", "w") as f:
#     tags = list()
#     for tag, count in tag_counter.most_common():
#         tags.append(f'"{tag}": "name"  # {count}')

#     f.write("\n".join(sorted(tags)))
