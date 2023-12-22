import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <div className="container" style={{ minHeight: "71vh", maxWidth: "75vw", fontSize: "17pt" }}>
        <h1 style={{ backgroundColor: "oldlace" }}>ABOUT US...</h1>
        Welcome to PopWiz, your premier destination for Pop Figures! Immerse yourself in the
        enchanting world of collectibles curated with love and passion. At PopWiz, we're not just
        sellers; we're storytellers, bringing iconic characters from beloved franchises to life. Our
        collection showcases the finest quality Pop Figures, celebrating the magic they hold for
        fans worldwide. From superheroes to cinematic legends, PopWiz is your go-to haven for
        authentic and captivating collectibles. Join our community of enthusiasts, and let PopWiz be
        your gateway to a world where every figure sparks joy and every purchase is a piece of
        nostalgia. Start your collection journey with PopWiz today!
      </div>
    </>
  );
};

export default About;
