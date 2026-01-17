export function FAQ() {
  const faqs = [
    {
      question: "What counts as a credit?",
      answer:
        "A credit is used when you publish a backend. You can iterate and preview as much as you want before publishing.",
    },
    {
      question: "Can I regenerate without spending credits?",
      answer:
        "Yes. Tweak fields, endpoints, and settings freely. Credits only apply when you publish.",
    },
    {
      question: "Do credits expire?",
      answer:
        "Pro credits roll over up to 4 total, and Team credits roll over up to 8.",
    },
    {
      question: "Where can I host the code?",
      answer:
        "Anywhere. You own the code and can deploy to any platform you prefer.",
    },
  ];

  return (
    <section id="faq" className="relative py-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            FAQ
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Short answers to the questions we get most often.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
