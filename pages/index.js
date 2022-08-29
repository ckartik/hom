import Hero from "../components/Hero";
import Header from "../components/Header";
import SmallCard from "../components/SmallCard";
import Map from "../components/Map";

import {
  smallCardData,
  mediumCardData,
  discoverData,
} from "../constants/cardData";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";
import DiscoverCard from "../components/DiscoverCard";

import largecard1 from "../images/largecard1.jpg";

const Home = ({ searchResults }) => {
  return (
    <div>
      <Header />
      <Hero />
      <main className="mx-auto px-12 sm:px-20">
        <section className="pt-6">
          <h2 className="text-3xl font-bold pb-5">Most Popular Regions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {smallCardData.map(({ location, distance, image }) => (
              <SmallCard
                location={location}
                distance={distance}
                image={image}
                key={image}
              />
            ))}
          </div>
        </section>
        <LargeCard
          image={largecard1}
          title="Wondering how we find our homes?"
          desc=""
          buttonText="Learn more"
        />
        <section className="pb-5">
          <h2 className="text-3xl font-bold pb-5 py-8">Live anywhere</h2>
          <div className="flex space-x-8 overflow-scroll scrollbar-hide p-3 -ml-3">
            {mediumCardData.map(({ image, title }) => (
              <MediumCard image={image} title={title} key={image} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const searchResults = await fetch("https://jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
};
