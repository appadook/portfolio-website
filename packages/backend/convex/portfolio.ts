import { v } from 'convex/values';
import { query } from './_generated/server';

const sortByOrder = <T extends { order: number }>(items: T[]) =>
  [...items].sort((a, b) => a.order - b.order);

export const getSiteSettings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('siteSettings')
      .withIndex('by_key', (q) => q.eq('key', 'global'))
      .unique();
  },
});

export const getExperiences = query({
  args: {},
  handler: async (ctx) => {
    const experiences = await ctx.db.query('experiences').collect();
    return sortByOrder(experiences);
  },
});

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query('projects').collect();
    return sortByOrder(projects);
  },
});

export const getProjectsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const projects = await ctx.db.query('projects').collect();
    if (args.category === 'All') {
      return sortByOrder(projects);
    }
    return sortByOrder(projects).filter((project) =>
      project.categories.includes(args.category),
    );
  },
});

export const getProgrammingLanguages = query({
  args: {},
  handler: async (ctx) => {
    const languages = await ctx.db.query('programmingLanguages').collect();
    return sortByOrder(languages);
  },
});

export const getTechnologies = query({
  args: {},
  handler: async (ctx) => {
    const technologies = await ctx.db.query('technologies').collect();
    return technologies.sort((a, b) => {
      if (a.category === b.category) {
        return a.order - b.order;
      }
      return a.category.localeCompare(b.category);
    });
  },
});

export const getTechnologiesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const technologies = await ctx.db
      .query('technologies')
      .withIndex('by_category_order', (q) => q.eq('category', args.category))
      .collect();
    return sortByOrder(technologies);
  },
});

export const getCloudProvidersWithCertificates = query({
  args: {},
  handler: async (ctx) => {
    const providers = sortByOrder(await ctx.db.query('cloudProviders').collect());

    const providersWithCertificates = await Promise.all(
      providers.map(async (provider) => {
        const certificates = await ctx.db
          .query('certificates')
          .withIndex('by_provider', (q) => q.eq('providerId', provider._id))
          .collect();

        return {
          ...provider,
          certificates: sortByOrder(certificates),
        };
      }),
    );

    return providersWithCertificates;
  },
});

export const getAboutCategories = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db.query('aboutCategories').collect();
    return sortByOrder(categories);
  },
});

export const getAboutItems = query({
  args: {},
  handler: async (ctx) => {
    const [items, categories] = await Promise.all([
      ctx.db.query('aboutItems').collect(),
      ctx.db.query('aboutCategories').collect(),
    ]);

    const categoryMap = new Map(categories.map((category) => [category._id, category]));

    return sortByOrder(items)
      .map((item) => {
        const category = categoryMap.get(item.categoryId);
        if (!category) {
          return null;
        }

        return {
          ...item,
          category,
        };
      })
      .filter(Boolean);
  },
});

export const getAboutItemsByCategory = query({
  args: { categoryId: v.id('aboutCategories') },
  handler: async (ctx, args) => {
    const [items, category] = await Promise.all([
      ctx.db
        .query('aboutItems')
        .withIndex('by_category', (q) => q.eq('categoryId', args.categoryId))
        .collect(),
      ctx.db.get(args.categoryId),
    ]);

    if (!category) {
      return [];
    }

    return sortByOrder(items).map((item) => ({
      ...item,
      category,
    }));
  },
});
