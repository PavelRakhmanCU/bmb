import React from "react";

const sections = [
  {
    title: "Our Story",
    portrait: {
      src: "/images/portrait.jpeg",
      alt: "Peter Kashaev",
    },
    content: `
I'm Peter Kashaev, and if you ever find yourself lost in the winding streets of Samarkand, chances are I'll be the one pointing you towards the nearest tea house. Growing up in Central Asia, I developed a taste for adventure and a knack for solving problems - skills that would eventually lead me to start my own construction company.

But it wasn't until I found myself wandering through the ancient city's streets, surrounded by the echoes of the past and the hum of modernity, that I realized what I was meant to do. Futuristic skyscrapers towered above, while centuries-old mosques and madrasahs stood proudly alongside, their intricate tile work a testament to the city's rich history. I chuckled to myself, thinking that if the ancient architects could see the modern marvels, they'd probably be both impressed and confused.

As I strolled, I couldn't help but think about my own future. What business to start? I had always been handy with tools and had a knack for problem-solving, but I wanted something more meaningful. Something that would leave a lasting impact.

That's when it hit me - construction. Specifically, building and renovating spaces that would serve people for generations to come. I smiled wily, thinking that maybe, just maybe, I could become the modern equivalent of the ancient architects I admired.

"Why not?" I thought. "I'm from a culture that's been tiling for centuries. It's in my blood!" I laughed at the idea, but deep down, I knew it was more than just a joke. I had a practical intelligence that served me well, and I was eager to put it to use.

As I continued my stroll, I envisioned myself transforming dusty old buildings into stunning modern spaces, all while honoring the traditions of my ancestors. I imagined the look on people's faces when they stepped into a beautifully renovated bathroom, and I knew I had found my calling.

And so, with a dash of humor and a healthy dose of ambition, I embarked on my journey as a construction entrepreneur, ready to leave my mark on the world, one tile at a time`,
  },
  {
    title: "Our Philosophy",
    content: `
At the heart of everything we do is a commitment to quality. Not just any quality, but exceptional quality that stands the test of time. I'm proud to say that our priority is simple: to create, build, and renovate bathrooms that are as durable as they are beautiful. In fact, our goal is to make them last longer than the houses they're in!

We believe that a well-crafted bathroom is not just a space, but an experience. One that should bring joy and comfort to those who use it, every day. That's why we strive to build and renovate in a way that makes our clients say, "Wow, I love it!" and mean it for years to come. In fact, our aim is to make our work so durable that our clients would sooner get tired of the design than what we built breaks down 😊.

We don't believe in one-size-fits-all solutions. Every client is unique, and so are their design ideas. We love working with clients who dare to be different, who push the boundaries of what's possible, and who appreciate non-standard solutions. If you've got a sophisticated design idea, we're all ears!

But at the end of the day, it's not just about the work – it's about the people. Happy clients are what drive us, what inspire us, and what make us proud of what we do. When you work with us, you can expect a partnership that's built on trust, transparency, and a passion for excellence.`,
  },
];

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <h1>About Us</h1>

      <div className="about-us-sections">
        {sections.map((section, index) => (
          <section
            key={section.title}
            className="about-us-section"
            aria-labelledby={`about-section-${index}`}
          >
            <h2 id={`about-section-${index}`} className="about-us-section__title">
              {section.title}
            </h2>
            {section.portrait ? (
              <div className="about-us-section__body about-us-story">
                <figure className="about-us-story__figure">
                  <img
                    className="about-us-story__portrait"
                    src={section.portrait.src}
                    alt={section.portrait.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="about-us-story__text">{section.content.trim()}</div>
              </div>
            ) : (
              <div className="about-us-section__body">{section.content.trim()}</div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
