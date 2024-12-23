import Footer from "../components/footer";

const TermsOfServicePage = () => {
  return (
    <>
      <h1 className="my-8 text-center text-3xl">Terms of Service</h1>

      <div className="mx-auto mb-8 w-[95%] rounded-xl bg-white p-2 shadow-lg sm:w-4/5">
        <div className="rounded-xl bg-neutral-light-gray p-8">
          <section className="mb-4">
            <h2 className="mb-1 text-base">Introduction</h2>
            <p>
              We are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and share your personal information
              when you use our services.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-base">
              What personal information do we collect?
            </h2>
            <p>
              We collect the following types of personal information from you:
            </p>
            <ul className="list-inside list-disc">
              <li>
                Contact information: This includes your name, email address,
                phone number, and mailing address.
              </li>
              <li>
                Account information: This includes your username, password, and
                security questions.
              </li>
              <li>
                Transaction information: This includes information about the
                services you purchase and the payments you make.
              </li>
              <li>
                Usage information: This includes information about how you use
                our services, such as the pages you visit and the ads you click
                on.
              </li>
              <li>
                Location information: This includes information about your
                physical location, such as your IP address and GPS coordinates.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-base">
              How do we use your personal information?
            </h2>
            <p>
              We use your personal information to provide the services you have
              requested, to improve our services, to communicate with you, and
              to protect our rights and interests.
            </p>
            <p>
              Specifically, we use your personal information for the following
              purposes:
            </p>
            <ul className="list-inside list-disc">
              <li>
                To provide the services you have requested: We use your contact
                information to send you confirmations, invoices, and other
                information about the services you have purchased. We use your
                account information to authenticate you and to keep your account
                secure. We use your transaction information to process your
                payments and to provide you with customer support. We use your
                usage information to improve our services and to provide you
                with personalized recommendations. We use your location
                information to provide you with relevant content and ads.
              </li>
              <li>
                To improve our services: We use your personal information to
                analyze how you use our services and to identify areas where we
                can improve. We also use your personal information to test new
                features and to develop new products.
              </li>
              <li>
                To communicate with you: We use your contact information to send
                you marketing communications, such as newsletters and
                promotional emails. We also use your contact information to
                respond to your questions and requests.
              </li>
              <li>
                To protect our rights and interests: We use your personal
                information to investigate and prevent fraud, to enforce our
                terms of service, and to protect our intellectual property
                rights.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-base">
              Who do we share your personal information with?
            </h2>
            <p>
              We may share your personal information with the following third
              parties:
            </p>
            <ul className="list-inside list-disc">
              <li>
                Our service providers: We may share your personal information
                with our service providers, who help us to provide our services,
                such as payment processors, email marketing providers, and
                analytics companies.
              </li>
              <li>
                Our partners: We may share your personal information with our
                partners, who offer products and services that may be of
                interest to you.
              </li>
              <li>
                Law enforcement: We may share your personal information with law
                enforcement if we are required to do so by law or if we believe
                that it is necessary to prevent fraud or protect our rights or
                interests.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-base">
              How do we protect your personal information?
            </h2>
            <p>
              We take steps to protect your personal information, including:
            </p>
            <ul className="list-inside list-disc">
              <li>We store your personal information on secure servers.</li>
              <li>
                We use encryption to protect your personal information when it
                is transmitted over the internet.
              </li>
              <li>
                We limit access to your personal information to authorized
                employees and contractors.
              </li>
              <li>
                We require our employees and contractors to comply with our
                privacy policies and procedures.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-base">What are your rights?</h2>
            <p>
              You have the following rights with respect to your personal
              information:
            </p>
            <ul className="list-inside list-disc">
              <li>
                Access: You have the right to access your personal information.
              </li>
              <li>
                Correction: You have the right to correct any inaccurate or
                incomplete personal information that we have about you.
              </li>
              <li>
                Deletion: You have the right to request that we delete your
                personal information.
              </li>
              <li>
                Portability: You have the right to request that we transfer your
                personal information to another organization.
              </li>
              <li>
                Objection: You have the right to object to the processing of
                your personal information.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-base">How can you contact us?</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at: [email protected]
            </p>
          </section>

          <section>
            <h2 className="mb-1 text-base">Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The most
              current version of the Privacy Policy will always be posted on our
              website. If we make any material changes to this Privacy Policy,
              we will notify you by email or through a prominent notice on our
              website.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TermsOfServicePage;
