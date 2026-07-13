import { treatments as staticTreatments } from '@/data/treatments';
import { defaultBlogs } from '@/data/blogs';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export default async function sitemap() {
  const baseUrl = 'https://www.myomotion.co.in';

  // Core static routes
  const routes = [
    '',
    '/about',
    '/academics',
    '/blogs',
    '/contact',
    '/doctor',
    '/faqs',
    '/locations',
    '/services/home-visit',
    '/services/online-consultation',
    '/treatments',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  let dbTreatments = [];
  let dbBlogs = [];

  try {
    await dbConnect();
    
    // Dynamically import models if they are not already in mongoose.models
    const TreatmentModel = mongoose.models.Treatment || (await import('@/models/Treatment')).default;
    if (TreatmentModel) {
      dbTreatments = await TreatmentModel.find({}, 'slug').lean();
    }
    
    const BlogModel = mongoose.models.Blog || (await import('@/models/Blog')).default;
    if (BlogModel) {
      dbBlogs = await BlogModel.find({}, 'slug').lean();
    }
  } catch (err) {
    console.error('Error fetching DB records for sitemap:', err);
  }

  // Combine DB treatments and static treatments uniquely
  const allTreatmentSlugs = new Set([
    ...staticTreatments.map(t => t.slug),
    ...dbTreatments.map(t => t.slug)
  ]);
  const treatmentRoutes = Array.from(allTreatmentSlugs).map((slug) => ({
    url: `${baseUrl}/treatments/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Combine DB blogs and static blogs uniquely
  const allBlogSlugs = new Set([
    ...defaultBlogs.map(b => b.slug),
    ...dbBlogs.map(b => b.slug)
  ]);
  const blogRoutes = Array.from(allBlogSlugs).map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...treatmentRoutes, ...blogRoutes];
}
