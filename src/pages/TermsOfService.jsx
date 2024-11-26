import React from "react";
import "../styles/feedbackSocialSupport.css";

const TermsAndPrivacy = () => (
  <div className="terms-and-privacy">
    <section className="terms-of-service">
      <h1>Terms of Service</h1>
      <p>By using our platform, you agree to the following terms and conditions:</p>
      <ul>
        <li>You will provide accurate information during registration.</li>
        <li>You will not misuse the platform for illegal purposes.</li>
        <li>The platform is not liable for issues arising between employers and job seekers.</li>
      </ul>
      <p>For more details, please contact support.</p>
    </section>

    <hr className="divider" />

    <section className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>We value your privacy. Here's how we handle your data:</p>
      <ul>
        <li>We collect only necessary information for job matching.</li>
        <li>Your data will never be shared without consent.</li>
        <li>You can request to delete your data anytime.</li>
      </ul>
      <p>Feel free to contact us for further information.</p>
    </section>
  </div>
);

export default TermsAndPrivacy;
