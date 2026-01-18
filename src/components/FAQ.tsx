export function FAQ() {
  const faqs = [
    {
      question: "What's the Founding Users program?",
      answer:
        "The first 25 paying customers get 50% off their first year. This includes early access, priority on feature requests, and a Founding User badge.",
    },
    {
      question: "What counts as an endpoint?",
      answer:
        "One endpoint = one route (e.g., GET /users, POST /login). A standard CRUD resource uses 5 endpoints. You can preview and iterate freely before publishing.",
    },
    {
      question: "Can I use endpoints across projects?",
      answer:
        "Yes. Build one large project with 40 endpoints or four small projects with 10 each. Your endpoints, your choice.",
    },
    {
      question: "Do endpoints expire?",
      answer:
        "Starter Pack endpoints never expire. Pro rolls over up to 100 total, Team up to 350. Free resets monthly.",
    },
    {
      question: "Can I upgrade from Starter to Pro?",
      answer:
        "Yes! Your unused Starter endpoints remain available, and you can subscribe to Pro anytime.",
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
