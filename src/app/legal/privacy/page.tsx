import { Metadata } from "next";
import React, { FC } from "react";

export const metadata: Metadata = {
  title: "Privacy Policies - Schedify",
  icons: [
    {
      url: "https://schedify.dev/schedify.png",
    },
  ],
};

const PrivacyPolicy = () => {
  return (
    <div className="container py-10 pt-20 space-y-0 font-geist-sans">
      <h1 className="text-3xl font-bold uppercase">Schedify Privacy Policy</h1>

      <p className="text-zinc-700 text-sm py-2">
        <b>Effective Date:</b> December 10, 2024
      </p>

      <p className="py-4">
        This Privacy Policy (“<b>Policy</b>”) outlines how Schedify, a
        proprietorship (“<b>Schedify</b>,” “<b>we</b>,” “<b>our</b>,” or “
        <b>us</b>”), collects, uses, and protects your personal data when you
        access and use our webhook scheduling services (“<b>Services</b>”). By
        using our Services, you agree to the practices described in this Policy.
      </p>

      <h2 className="text-lg font-bold uppercase py-2">
        1. Information We Collect
      </h2>
      <p>
        We collect the following types of information when you use our Services:
      </p>
      <ul className="list-decimal pl-10 space-y-2">
        <li>
          <b>Personal Information:</b> When you register for an account, we may
          collect personal details such as your name, email address, and other
          contact information.
        </li>
        <li>
          <b>Authentication Information:</b> We rely on Clerk for
          authentication, which may collect data such as your login credentials
          and authentication tokens.
        </li>
        <li>
          <b>Usage Data:</b> We collect data on how you use our Services,
          including interactions with the webhook scheduling features,
          timestamps, and any actions taken within the platform.
        </li>
        <li>
          <b>Payment Information:</b> If you make any purchases or subscribe to
          paid features, we may collect billing information such as credit card
          details, processed through third-party payment processors.
        </li>
      </ul>

      <h2 className="text-lg font-bold uppercase py-2">
        2. How We Use Your Information
      </h2>
      <p>We use your information for the following purposes:</p>
      <ul className="list-decimal pl-10 space-y-2">
        <li>To provide, operate, and maintain the Services.</li>
        <li>To authenticate and manage your account.</li>
        <li>
          To improve the functionality and user experience of the Services based
          on usage patterns.
        </li>
        <li>
          To send you notifications, updates, and promotional communications
          (with your consent where applicable).
        </li>
        <li>To process payments and manage billing for paid features.</li>
      </ul>

      <h2 className="text-lg font-bold uppercase py-2">
        3. Sharing Your Information
      </h2>
      <p>
        We do not share your personal information with third parties except in
        the following circumstances:
      </p>
      <ul className="list-decimal pl-10 space-y-2">
        <li>
          <b>Service Providers:</b> We may share data with third-party vendors
          and service providers that help us operate and improve our Services.
        </li>
        <li>
          <b>Legal Requirements:</b> We may disclose your information if
          required by law, regulation, legal process, or governmental request.
        </li>
        <li>
          <b>Business Transfers:</b> If we are involved in a merger,
          acquisition, or asset sale, your personal data may be transferred as
          part of that transaction.
        </li>
      </ul>

      <h2 className="text-lg font-bold uppercase py-2">4. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your
        personal information from unauthorized access, disclosure, alteration,
        or destruction. However, no method of transmission over the Internet or
        electronic storage is completely secure, and we cannot guarantee
        absolute security.
      </p>

      <h2 className="text-lg font-bold uppercase py-2">
        5. Your Rights and Choices
      </h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul className="list-decimal pl-10 space-y-2">
        <li>
          <b>Access:</b> You may request a copy of the personal information we
          hold about you.
        </li>
        <li>
          <b>Correction:</b> You may request corrections to any inaccurate or
          incomplete information.
        </li>
        <li>
          <b>Deletion:</b> You may request the deletion of your personal
          information, subject to certain legal exceptions.
        </li>
        <li>
          <b>Opt-out:</b> You may opt-out of receiving promotional emails by
          following the unsubscribe instructions in those communications.
        </li>
      </ul>

      <h2 className="text-lg font-bold uppercase py-2">
        6. Cookies and Tracking Technologies
      </h2>
      <p>
        We use cookies and similar tracking technologies to enhance your
        experience and collect usage data. These technologies help us:
      </p>
      <ul className="list-decimal pl-10 space-y-2">
        <li>Remember your preferences and settings.</li>
        <li>Understand how you interact with our Services.</li>
        <li>Analyze website traffic and improve our Services.</li>
      </ul>
      <p>
        You can control cookies through your browser settings, including
        disabling cookies or receiving alerts when cookies are being sent.
        However, please note that disabling cookies may impact the functionality
        of certain features.
      </p>

      <h2 className="text-lg font-bold uppercase py-2">7. Data Retention</h2>
      <p>
        We will retain your personal information for as long as necessary to
        fulfill the purposes outlined in this Privacy Policy or as required by
        law. When personal information is no longer necessary, we will securely
        delete or anonymize it.
      </p>

      <h2 className="text-lg font-bold uppercase py-2">
        8. International Data Transfers
      </h2>
      <p>
        If you are accessing our Services from outside of the country where
        Schedify operates, please be aware that your personal information may be
        transferred to a country that may not have data protection laws
        equivalent to those in your jurisdiction.
      </p>

      <h2 className="text-lg font-bold uppercase py-2">
        9. Changes to This Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. When we make
        significant changes, we will notify you via email or by posting a notice
        on our website. The updated Policy will be effective immediately upon
        posting.
      </p>

      <h2 className="text-lg font-bold uppercase py-2">10. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at:
      </p>

      <p className="pl-10">
        <b>Schedify</b>
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

export default PrivacyPolicy;
