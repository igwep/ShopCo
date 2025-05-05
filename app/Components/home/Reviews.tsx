'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


const reviews = [
  {
    id: 1,
    author: 'John Doe',
    text: `Fantastic service and fast shipping!
We received our order in record time.
The packaging was secure and eco‑friendly.
Highly recommend this company to everyone.`,
    rating: 5
  },
  {
    id: 2,
    author: 'Jane Smith',
    text: `Good quality overall, but a bit on the pricey side.
Still, I found the materials top‑notch.
Customer support was quick to answer my questions.
Overall, a solid purchase experience.`,
    rating: 4
  },
  {
    id: 3,
    author: 'Alice Johnson',
    text: `Loved the design from the moment I saw it.
The colors matched my décor perfectly.
Assembly was straightforward and took minutes.
I will definitely buy again!`,
    rating: 5
  },
  {
    id: 4,
    author: 'Bob Brown',
    text: `Average experience overall.
Some small issues with the fit.
Delivery was slightly delayed.
But product performance met expectations.`,
    rating: 3
  },
  {
    id: 5,
    author: 'Laura King',
    text: `Exceptional customer service!
They went above and beyond to help.
My questions were answered patiently.
Truly a five‑star support team.`,
    rating: 5
  },
  {
    id: 6,
    author: 'Michael Green',
    text: `Unfortunately, my item arrived damaged.
Packaging didn’t protect it enough.
I had to request a replacement.
The return process was a bit slow.`,
    rating: 2
  },
  {
    id: 7,
    author: 'Sara White',
    text: `Quick response from the support team.
They solved my issue within hours.
Follow‑up communication was clear.
Kudos for the efficient service!`,
    rating: 4
  },
  {
    id: 8,
    author: 'Daniel Lee',
    text: `Product quality truly exceeded expectations.
Materials felt premium to the touch.
Details and stitching were flawless.
I’ll be a repeat customer for sure!`,
    rating: 5
  },
  {
    id: 9,
    author: 'Emily Davis',
    text: `Delivery took longer than I hoped.
But once it arrived, everything was intact.
Product matched the description perfectly.
Worth the wait in the end.`,
    rating: 3
  },
  {
    id: 10,
    author: 'Chris Wilson',
    text: `Exactly what I ordered—no surprises.
Fit and finish were spot‑on.
Installation was a breeze thanks to clear instructions.
Very satisfied overall.`,
    rating: 4
  },
  {
    id: 11,
    author: 'Nina Patel',
    text: `Website was easy to navigate from start to finish.
Checkout was seamless and secure.
Received confirmation emails immediately.
Great user experience all around!`,
    rating: 5
  },
  {
    id: 12,
    author: 'George Clark',
    text: `Not worth the money in my opinion.
Build quality felt subpar.
Some components seemed cheap.
Would not recommend at this price point.`,
    rating: 2
  },
  {
    id: 13,
    author: 'Olivia Moore',
    text: `Five stars for customer care!
They tracked my order proactively.
Provided timely updates every step of the way.
Excellent post‑sale support too.`,
    rating: 5
  },
  {
    id: 14,
    author: 'Henry Scott',
    text: `Decent purchase overall.
Met my basic needs well.
Nothing surprising, but nothing bad.
Might shop here again.`,
    rating: 3
  },
  {
    id: 15,
    author: 'Chloe Turner',
    text: `Super impressed with packaging and delivery!
Everything arrived in pristine condition.
Unboxing was a delight.
Will definitely recommend to friends.`,
    rating: 5
  },
];



const ReviewCarousel = () => {
  const [visible, setVisible] = useState(3.2);
  const [idx, setIdx] = useState(3.2);
  const [withTransition, setWithTransition] = useState(true);
  const track = useRef<HTMLDivElement>(null);

  // Responsive visible count
  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisible(1);
        setIdx(1);
      } else {
        setVisible(3.2);
        setIdx(3.2);
      }
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const total = reviews.length;
  const slides = [
    ...reviews.slice(-Math.ceil(visible)),
    ...reviews,
    ...reviews.slice(0, Math.ceil(visible)),
  ];
  const N = slides.length;

  useEffect(() => {
    if (!track.current) return;
    const pct = (idx / N) * 100;
    track.current.style.transform = `translateX(-${pct}%)`;
    track.current.style.transition = withTransition
      ? "transform 0.5s ease-in-out"
      : "none";
  }, [idx, withTransition, N]);

  const onEnd = () => {
    let newIdx = idx;
    if (idx >= total + visible) {
      newIdx = idx - total;
      setWithTransition(false);
      setIdx(newIdx);
    } else if (idx < visible) {
      newIdx = idx + total;
      setWithTransition(false);
      setIdx(newIdx);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      requestAnimationFrame(() => setWithTransition(true));
    }
  }, [withTransition]);

  const prev = () => withTransition && setIdx(i => i - 1);
  const next = () => withTransition && setIdx(i => i + 1);

  return (
    <div className="relative md:pt-16 pb-36">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 md:px-34 3xl:px-64 px-4">
        <h1 className="md:text-5xl text-3xl font-black">OUR HAPPY CUSTOMERS</h1>
        <div className="flex gap-2">
          <button onClick={prev} className="p-2 hover:scale-110 transition ">
            <Image src="/SVG/arrow-down-bold 2.svg" alt="prev" width={30} height={20} />
          </button>
          <button onClick={next} className="p-2 hover:scale-110 transition ">
            <Image src="/SVG/forwardArrow.svg" alt="next" width={30} height={20} />
          </button>
        </div>
      </div>
      <div className="relative w-full overflow-hidden px-4">
      {/* Left blur overlay */}
<div
  className="absolute inset-y-0 left-0 pointer-events-none backdrop-blur-[1px] bg-white/30 z-40 w-[40px] md:w-[130px]"
/>

{/* Right blur overlay */}
<div
  className="absolute inset-y-0 right-0 pointer-events-none backdrop-blur-[1px] bg-white/30 z-40 w-[40px] md:w-[130px]"
/>
        <div className="overflow-hidden">
          <div
            ref={track}
            className="flex"
            style={{ width: `${(N / visible) * 100}%` }}
            onTransitionEnd={onEnd}
          >
            {slides.map((r, i) => (
              <div
                key={`${r.id}-${i}`}
                className="p-2"
                style={{ width: `${100 / visible}%` }}
              >
                <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-md h-full">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, j) => (
                      <span
                        key={j}
                        className={`text-xl ${
                          j < r.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <span className="text-lg">{r.author}</span>
                    <Image src="/SVG/check.svg" alt="verified" width={20} height={20} />
                  </div>
                  <p className="text-gray-700 italic">&quot;{r.text}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
