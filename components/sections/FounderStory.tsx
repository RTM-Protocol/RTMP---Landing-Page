const BLOCKS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "I WAS RAISED ON \u201CJUST GET ON WITH IT.\u201D",
    paragraphs: [
      "Like most men I've known, that British stiff upper lip was my guiding principle. No matter the setback. No matter the trauma. Get on with it.",
      "But it wasn't serving me. It was breaking me from within. Because I wasn't dealing with the real issue: me. The drivers behind my thoughts. How I was navigating the rough terrain of life.",
    ],
  },
  {
    heading: "FOR DECADES, I CARRIED IT IN SILENCE.",
    paragraphs: [
      "Second youngest of eight in a blended family. Felt out of place. Awkward and lonely. My mum was my anchor — I always felt her love and affection, even amongst so many siblings competing for her attention.",
      "My dad was a different story. Silent. A strict disciplinarian. A man of very few words. Trying to connect with him the way I could with my mum was often fruitless. He gave me tools I'd carry through life. Some good. Some, not so much.",
      "I suffered in and out of depression for decades. Periods where I couldn't get out from under the covers just to face the day. Weeping. Sleeping. Doing anything to avoid living in the real world. I never sought professional help. I never spoke openly. Not to friends. Not to family.",
    ],
  },
  {
    heading: "THEN 2020 ALMOST BROKE ME.",
    paragraphs: [
      "The pandemic hit. I was living alone, isolated and confused. Going through a divorce. Away from my daughter. Blow after blow after blow.",
      "Where was the sunshine after the rain?",
      "In the depths of that period, I considered checking out of life altogether. And yet — as always — I picked myself up and got on with it. Without ever truly dealing with it.",
    ],
  },
  {
    heading: "EVENTUALLY, I CHANGED.",
    paragraphs: [
      "A special woman came into my life. She was the one who encouraged me to seek professional help. At first I sidestepped it — as most of us do. But when I saw how my unresolved pain was hurting her, something had to change. I had to change.",
      "I tried counselling. Half-heartedly at first. And I kept coming back to one truth about how men are built. Yes, external help is important and valid. But many of us want to figure it out ourselves. Self-reliance. Give us the map and we'll find our own way. A bit of direction? Sure. But we'll drive.",
      "Most men are wired that way. I'm no different.",
    ],
  },
  {
    heading:
      "THE REASON WHY I BUILT THIS.",
    paragraphs: [
      "We men are often reluctant to talk about our feelings. We shy away from probing questions about our past. But give us a tool we can use? Give us clear direction and actionable steps so we can run the programme ourselves and get the desired outcome we need? We'll go for that every time.",
      "That's what this is. Actionable steps to move the needle on depression, anxiety, stress, and the heavy stuff men carry in silence. Built on the insights of industry experts who'd charge you hundreds per session — but ultimately leave you to do the work yourself anyway.",
      "I'm a realist. I believe in getting the job done.",
      "Having applied these principles myself, I'm in a far better place than I have ever been. And I want that for you too.",
      "You deserve it.",
      "There's nothing quite like this built for men — for the way we actually want to work. A way to reconstruct your mind, place yourself on solid ground, and rebuild your sense of worth, optimism, clarity, hope, and strength as the man you truly are.",
    ],
  },
];

export function FounderStory() {
  return (
    <section className="section-pad border-b border-border-subtle bg-bg-secondary">
      <div className="mx-auto max-w-story px-5">
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
          Why I Built This.
        </h2>

        <hr className="mx-auto mt-8 w-full border-0 border-t border-border-subtle" />

        <div className="mt-4">
          {BLOCKS.map((block) => (
            <div key={block.heading} className="mt-12 first:mt-12">
              <h3 className="font-mono text-base font-bold uppercase tracking-tight text-accent-orange sm:text-lg">
                {block.heading}
              </h3>
              {block.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="mt-5 text-[17px] leading-[1.75] text-text-primary sm:text-[19px]"
                >
                  {para}
                </p>
              ))}
            </div>
          ))}

          <p className="mt-12 text-[17px] leading-[1.75] text-text-primary sm:text-[19px]">
            — Jay, Founder
          </p>
        </div>
      </div>
    </section>
  );
}
