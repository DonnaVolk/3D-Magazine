import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pictures = [
  "pagina1.0",
  "pagina1.1",
  "pagina2.0",
  "pagina2.1",
  "pagina3.0",
  "pagina3.1",
];

const pageNames = [
  "Voorblad",
  "Pagina 1",
  "Pagina 2",
  "Pagina 3",
];


export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className="main-container">
        <span></span>
        <div className="scroll-container">

          <div className="button-container">
            {pageNames.map((name, index) => (
              <button
                key={index}
                className={`button ${index === 0 || index === pageNames.length ? "invisible" : ""
                  } ${index === page ? "active" : ""}`}
                onClick={() => setPage(index)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="scrolling-text">
        <div className="text-row animate-horizontal-scroll">
          <h2 className="full-text">For The Culture</h2>
          <h2 className="outline-text">For The Growth</h2>
          <h2 className="full-text">For The Vibes</h2>
        </div>
        <div className="text-row animate-horizontal-scroll-2">
          <h2 className="outline-text">For The Culture</h2>
          <h2 className="full-text">For The Growth</h2>
          <h2 className="outline-text">For The Vibes</h2>
        </div>
      </div>
    </>
  );
};
