import Papa from "papaparse";
import { useEffect, useState } from "react";

interface Quote {
  quote: string;
  character: string;
  source: string;
}
async function loadQuotesFromCSV(url: string): Promise<Quote[]> {
  const response = await fetch(url);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<Quote>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
}

function App() {

  const [currentQuote, setCurrentQuote] = useState<Quote>({
    quote: "Loading...",
    character: "",
    source: "",
  });

  useEffect(() => {
    loadQuotesFromCSV("/data/of13_quotes.csv")
      .then((quotes) => {
        const element = quotes[Math.floor(Math.random() * quotes.length)];
        setCurrentQuote(element);
        console.log(element);
      })
      .catch((error) => {
        console.error("Error loading quotes:", error);
      });
  }, []);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-zinc-900 text-zinc-100">
      <h1 className="max-w-300 scroll-m-20 text-center text-3xl md:text-5xl font-medium text-balance">
        " {currentQuote.quote} "
      </h1>
      <div className="my-10 text-center text-xl md:text-2xl text-balance">
        {currentQuote.character}
      </div>
    </div>
  );
}

export default App;
