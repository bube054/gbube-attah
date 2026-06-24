import type { StructureBuilder, StructureResolver } from "sanity/structure";

const singleton = (S: StructureBuilder, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id));

/** Surfaces the two singletons and groups the repeatable page content. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "siteSettings", "Site settings"),
      S.divider(),
      S.listItem()
        .title("Page")
        .child(
          S.list()
            .title("Page")
            .items([
              singleton(S, "homePage", "Hero & section copy"),
              S.documentTypeListItem("project").title("Projects"),
              S.documentTypeListItem("skillGroup").title("Skill groups"),
              S.documentTypeListItem("experienceItem").title("Experience"),
              S.documentTypeListItem("writingPlatform").title("Writing · Platforms"),
              // Open-source repos, About stats and articles are pulled live from
              // GitHub / dev.to / Medium, so they aren't editable here.
            ]),
        ),
    ]);
