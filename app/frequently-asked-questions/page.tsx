import Footer from "../components/footer";
import FAQList from "../contact-us/faqs/faqList";

const FAQsPage = () => {
  return (
    <>
      <h1 className="my-8 text-center text-3xl">FAQs</h1>

      <div className="mx-auto mb-16 w-[95%] rounded-xl border bg-white p-4 shadow-lg sm:w-4/5">
        <FAQList />
      </div>

      <Footer />
    </>
  );
};

export default FAQsPage;
