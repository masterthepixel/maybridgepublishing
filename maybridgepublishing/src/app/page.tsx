import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { BookShowcase } from "@/components/BookShowcase";
import { EnhancedHero } from "@/components/EnhancedHero";
import { AboutUs } from "@/components/AboutUs";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";
import { Newsletter } from "@/components/Newsletter";
import { EnhancedFooter } from "@/components/EnhancedFooter";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());

  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Page() {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());

  return (
    <div>
      {/* Enhanced Epic 3 Landing Page Sections */}
      <EnhancedHero />
      
      {/* Original Prismic content */}
      <SliceZone slices={page.data.slices} components={components} />
      
      {/* Book showcase from Epic 1 */}
      <BookShowcase />
      
      {/* About Us section */}
      <AboutUs />
      
      {/* Testimonials section */}
      <Testimonials />
      
      {/* Contact form */}
      <div id="contact">
        <ContactForm />
      </div>
      
      {/* Newsletter signup */}
      <div id="newsletter">
        <Newsletter />
      </div>
      
      {/* Enhanced footer */}
      <EnhancedFooter />
    </div>
  );
}
