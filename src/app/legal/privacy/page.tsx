import React, { FC } from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container py-10 space-y-4 font-geist-sans">
      <h1 className="text-3xl font-bold uppercase text-gray-800">
        Privacy Policy
      </h1>

      <p className="text-zinc-700 text-sm">
        <b>Effective Date:</b> December 10, 2024
      </p>

      <p>
        Schedify Inc. (<b>“Schedify,” “we,” “our,”</b> or <b>“us”</b>), a
        subsidiary of SamSwe Pvt Ltd, is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, share, and protect
        your information.
      </p>

      <SectionTitle>1. Information We Collect</SectionTitle>
      <StyledList>
        <li>
          <b>Account Information:</b> Personal details provided during
          registration via Clerk, such as your name, email address, and
          authentication data.
        </li>
        <li>
          <b>Webhook Data:</b> URLs, payloads, and schedules submitted by you
          through the Services.
        </li>
        <li>
          <b>Usage Data:</b> Logs, IP addresses, and other technical data
          automatically collected during your interaction with the Services.
        </li>
      </StyledList>

      <SectionTitle>2. Use of Information</SectionTitle>
      <p>We use your information to:</p>
      <StyledList>
        <li>Provide and operate the Services.</li>
        <li>Process and deliver webhook requests as scheduled.</li>
        <li>Improve and optimize the functionality of the Services.</li>
        <li>
          Communicate with you regarding account updates, security issues, or
          new features.
        </li>
      </StyledList>

      <SectionTitle>3. Sharing of Information</SectionTitle>
      <StyledList>
        <li>
          <b>Service Providers:</b> We may share your information with trusted
          third parties, such as Clerk, for authentication and service delivery
          purposes.
        </li>
        <li>
          <b>Legal Requirements:</b> We may disclose your information if
          required by law or to protect our legal rights.
        </li>
        <li>
          <b>Business Transfers:</b> In the event of a merger, acquisition, or
          sale, your information may be transferred as part of the transaction.
        </li>
      </StyledList>

      <SectionTitle>4. Data Security</SectionTitle>
      <p>
        We implement industry-standard measures to protect your information from
        unauthorized access, use, or disclosure. However, no system can be
        entirely secure, and you use the Services at your own risk.
      </p>

      <SectionTitle>5. Data Retention</SectionTitle>
      <p>
        We retain your data for as long as necessary to fulfill the purposes
        outlined in this Privacy Policy or to comply with legal obligations.
      </p>

      <SectionTitle>6. Your Rights</SectionTitle>
      <p>
        You may request access to, correction of, or deletion of your personal
        information by contacting us at <b>privacy@schedify.dev</b>. We will
        respond to such requests in accordance with applicable laws.
      </p>

      <SectionTitle>7. Children’s Privacy</SectionTitle>
      <p>
        The Services are not intended for children under 18. We do not knowingly
        collect or process personal information from children.
      </p>

      <SectionTitle>8. Changes to This Policy</SectionTitle>
      <p>
        We may update this Privacy Policy periodically to reflect changes in our
        practices or applicable laws. Changes will be posted with a revised{" "}
        <b>“Effective Date.”</b>
      </p>

      <SectionTitle>9. Contact Information</SectionTitle>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at:
      </p>

      <p className="pl-10">
        <b>Schedify Inc.</b>
        <br />
        [Insert Address]
        <br />
        Email:{" "}
        <a
          className="underline underline-offset-2"
          href="mailto:privacy@schedify.dev"
        >
          privacy@schedify.dev
        </a>
      </p>
    </div>
  );
};

const SectionTitle: FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-bold uppercase text-gray-800">{children}</h2>
);

const StyledList: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="list-decimal pl-10 space-y-2">{children}</ul>
);

export default PrivacyPolicy;
