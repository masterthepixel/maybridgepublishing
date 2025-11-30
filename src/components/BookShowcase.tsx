import { PrimaryBooksSection } from "./PrimaryBooksSection";
import { JuniorHighBooksSection } from "./JuniorHighBooksSection";
import { SeniorHighBooksSection } from "./SeniorHighBooksSection";

export async function BookShowcase() {
  return (
    <div className="py-16 bg-zinc-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Books</h2>
        
        <PrimaryBooksSection />
        <JuniorHighBooksSection />
        <SeniorHighBooksSection />
      </div>
    </div>
  );
}