import { Metadata } from "next";

// Metadata for the TOS page
export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Go Resume's terms of service",
};

// TOS Page component
export default function TosPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-4">
        Welcome to Go Resume. These terms and conditions outline the rules and
        regulations for the use of Go Resume&apos;s Website.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Introduction</h2>
      <p className="mb-4">
        By accessing this website we assume you accept these terms and
        conditions. Do not continue to use Go Resume if you do not agree to take
        all of the terms and conditions stated on this page.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Cookies</h2>
      <p className="mb-4">
        We employ the use of cookies. By accessing Go Resume, you agreed to use
        cookies in agreement with the Go Resume&apos;s Privacy Policy.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">License</h2>
      <p className="mb-4">
        Unless otherwise stated, Go Resume and/or its licensors own the
        intellectual property rights for all material on Go Resume. All
        intellectual property rights are reserved. You may access this from Go
        Resume for your own personal use subjected to restrictions set in these
        terms and conditions.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">User Comments</h2>
      <p className="mb-4">
        Parts of this website offer an opportunity for users to post and
        exchange opinions and information in certain areas of the website. Go
        Resume does not filter, edit, publish or review Comments prior to their
        presence on the website. Comments do not reflect the views and opinions
        of Go Resume, its agents and/or affiliates. Comments reflect the views
        and opinions of the person who post their views and opinions.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">
        Hyperlinking to our Content
      </h2>
      <div className="mb-4">
        The following organizations may link to our Website without prior
        written approval:
        <ul className="list-inside list-disc">
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>
            Online directory distributors may link to our Website in the same
            manner as they hyperlink to the Websites of other listed businesses;
            and
          </li>
          <li>
            System wide Accredited Businesses except soliciting non-profit
            organizations, charity shopping malls, and charity fundraising
            groups which may not hyperlink to our Web site.
          </li>
        </ul>
      </div>
      <h2 className="mb-2 text-2xl font-semibold">iFrames</h2>
      <p className="mb-4">
        Without prior approval and written permission, you may not create frames
        around our Webpages that alter in any way the visual presentation or
        appearance of our Website.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Content Liability</h2>
      <p className="mb-4">
        We shall not be hold responsible for any content that appears on your
        Website. You agree to protect and defend us against all claims that is
        rising on your Website. No link(s) should appear on any Website that may
        be interpreted as libelous, obscene or criminal, or which infringes,
        otherwise violates, or advocates the infringement or other violation of,
        any third party rights.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Your Privacy</h2>
      <p className="mb-4">Please read Privacy Policy</p>
      <h2 className="mb-2 text-2xl font-semibold">Reservation of Rights</h2>
      <p className="mb-4">
        We reserve the right to request that you remove all links or any
        particular link to our Website. You approve to immediately remove all
        links to our Website upon request. We also reserve the right to amen
        these terms and conditions and it’s linking policy at any time. By
        continuously linking to our Website, you agree to be bound to and follow
        these linking terms and conditions.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">
        Removal of links from our website
      </h2>
      <p className="mb-4">
        If you find any link on our Website that is offensive for any reason,
        you are free to contact and inform us any moment. We will consider
        requests to remove links but we are not obligated to or so or to respond
        to you directly.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Disclaimer</h2>
      <div className="mb-4">
        To the maximum extent permitted by applicable law, we exclude all
        representations, warranties and conditions relating to our website and
        the use of this website. Nothing in this disclaimer will:
        <ul className="list-inside list-disc">
          <li>
            limit or exclude our or your liability for death or personal injury;
          </li>
          <li>
            limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li>
            exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>
      </div>
    </div>
  );
}
