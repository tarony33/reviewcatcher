// Seed location pages — placeholder blurbs. These are structurally seed
// content, same as the blog stubs: real, town-specific detail (client
// examples, local proof points) should replace these before the pages are
// worth indexing at scale. See README for the doorway-page caveat.
export interface Location {
  name: string;
  slug: string;
  blurb: string;
}

export const locations: Location[] = [
  {
    name: "Dublin",
    slug: "dublin",
    blurb:
      "Dublin is the most competitive local-search market in Ireland — a handful of reviews won't cut it when every trade and clinic in the city is fighting for the local pack. A steady, automated flow of Google reviews is what separates the businesses customers actually find from the ones with a great reputation nobody sees online.",
  },
  {
    name: "Cork",
    slug: "cork",
    blurb:
      "Cork businesses are increasingly competing on reputation as much as word of mouth, especially as more customers search Google before ever picking up the phone. Automating the ask means every happy customer gets the chance to leave a review, not just the ones you remember to follow up with.",
  },
  {
    name: "Galway",
    slug: "galway",
    blurb:
      "Galway's local market rewards businesses with an active, recent review profile — tourists and locals alike lean on Google before choosing who to call. A consistent stream of new reviews keeps you visible year-round, not just during peak season.",
  },
  {
    name: "Limerick",
    slug: "limerick",
    blurb:
      "In Limerick, a handful of outdated reviews can leave a genuinely great business looking less trustworthy than a newer competitor with a fresher profile. Automated, ongoing review requests keep your Google listing an accurate reflection of the work you're doing today.",
  },
  {
    name: "Waterford",
    slug: "waterford",
    blurb:
      "Waterford's local business scene is tight-knit, but Google search doesn't care about word of mouth — it ranks on signals like review volume and recency. Getting a steady flow of new reviews is the most direct way to show up ahead of nearby competitors.",
  },
];
