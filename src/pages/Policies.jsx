import React, { useState } from "react";

import classes from "./HomePage.module.css";
import HomeNav from "../components/Navbar/HomeNav";

import { MdMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";

const Policies = () => {
  const [state, setState] = useState("privacy");
  let content;

  if (state == "privacy") {
    content = (
      <>
        <h3>Last updated on Jul 23rd 2023 </h3>
        <p>
          This privacy policy sets out how YesWeCan uses and protects any
          information that you give YesWeCan when you use this website. YesWeCan
          is committed to ensuring that your privacy is protected. Should we ask
          you to provide certain information by which you can be identified when
          using this website, and then you can be assured that it will only be
          used in accordance with this privacy statement. YesWeCan may change
          this policy from time to time by updating this page. You should check
          this page from time to time to ensure that you are happy with any
          changes.
        </p>
        <h4>We may collect the following information:</h4>
        <ul>
          <li>Name and job title</li>
          <li>Contact information including email address</li>
          <li>
            Demographic information such as postcode, preferences and interests
          </li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
        <h4>What we do with the information we gather</h4>
        <p>
          We require this information to understand your needs and provide you
          with a better service, and in particular for the following reasons:
        </p>
        <ul>
          <li>Internal record keeping.</li>
          <li>
            We may use the information to improve our products and services
          </li>
          <li>
            We may periodically send promotional emails about new products,
            special offers or other information which we think you may find
            interesting using the email address which you have provided.
          </li>
          <li>
            From time to time, we may also use your information to contact you
            for market research purposes. We may contact you by email, phone,
            fax or mail. We may use the information to customise the website
            according to your interests.
          </li>
        </ul>
        <p>
          We are committed to ensuring that your information is secure. In order
          to prevent unauthorised access or disclosure we have put in suitable
          measures.
        </p>
        <h4>Controlling your personal information</h4>
        <p>
          You may choose to restrict the collection or use of your personal
          information in the following ways:
        </p>
        <ul>
          <li>
            whenever you are asked to fill in a form on the website, look for
            the box that you can click to indicate that you do not want the
            information to be used by anybody for direct marketing purposes
          </li>
          <li>
            if you have previously agreed to us using your personal information
            for direct marketing purposes, you may change your mind at any time
            by writing to or emailing us at software.yeswecan@gmail.com
          </li>
        </ul>
        <p>
          We will not sell, distribute or lease your personal information to
          third parties unless we have your permission or are required by law to
          do so. We may use your personal information to send you promotional
          information about third parties which we think you may find
          interesting if you tell us that you wish this to happen. If you
          believe that any information we are holding on you is incorrect or
          incomplete, please write to or email us as soon as possible, at the
          above address. We will promptly correct any information found to be
          incorrect.
        </p>
      </>
    );
  } else if (state == "refund") {
    content = (
      <>
        <h3>Last updated on Jul 23rd 2023 </h3>
        <p>
          YesWeCan believes in helping its customers as far as possible, and has
          therefore a liberal cancellation policy. Under this policy:
        </p>
        <ul>
          <li>
            Cancellations will be considered only if the request is made
            immediately after placing the order.
          </li>
          <li>
            In case you feel that the product received is not as shown on the
            site or as per your expectations, you must bring it to the notice of
            our customer service within 30 days of receiving the product. The
            Customer Service Team after looking into your complaint will take an
            appropriate decision .
          </li>
          <li>
            In case of any Refunds approved by the YesWeCan, it’ll take 3-5 days
            for the refund to be processed to the end customer.
          </li>
        </ul>
      </>
    );
  } else if (state == "conditions") {
    content = (
      <>
        <h3>Last updated on Jul 23rd 2023 </h3>
        <p>
          The Website Owner, including subsidiaries and affiliates (“Website” or
          “Website Owner” or “we” or “us” or “our”) provides the information
          contained on the website or any of the pages comprising the website
          (“website”) to visitors (“visitors”) (cumulatively referred to as
          “you” or “your” hereinafter) subject to the terms and conditions set
          out in these website terms and conditions, the privacy policy and any
          other relevant terms and conditions, policies and notices which may be
          applicable to a specific section or module of the website. Welcome to
          our website. If you continue to browse and use this website you are
          agreeing to comply with and be bound by the following terms and
          conditions of use, which together with our privacy policy govern
          YesWeCan''s relationship with you in relation to this website.
        </p>
        <h4>
          The use of this website is subject to the following terms of use:
        </h4>
        <ul>
          <li>
            The content of the pages of this website is for your general
            information and use only. It is subject to change without notice.
          </li>
          <li>
            Neither we nor any third parties provide any warranty or guarantee
            as to the accuracy, timeliness, performance, completeness or
            suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </li>
          <li>
            Your use of any information or materials on this website is entirely
            at your own risk, for which we shall not be liable. It shall be your
            own responsibility to ensure that any products, services or
            information available through this website meet your specific
            requirements.
          </li>
          <li>
            This website contains material which is owned by or licensed to us.
            This material includes, but is not limited to, the design, layout,
            look, appearance and graphics. Reproduction is prohibited other than
            in accordance with the copyright notice, which forms part of these
            terms and conditions.
          </li>
          <li>
            All trademarks reproduced in this website which are not the property
            of, or licensed to, the operator are acknowledged on the website.
          </li>
          <li>
            Unauthorized use of this website may give rise to a claim for
            damages and/or be a criminal offense.
          </li>
          <li>
            From time to time this website may also include links to other
            websites. These links are provided for your convenience to provide
            further information.
          </li>
          <li>
            You may not create a link to this website from another website or
            document without YesWeCan’s prior written consent.
          </li>
          <li>
            Your use of this website and any dispute arising out of such use of
            the website is subject to the laws of India or other regulatory
            authority.
          </li>
        </ul>
        <p>
          We as a merchant shall be under no liability whatsoever in respect of
          any loss or damage arising directly or indirectly out of the decline
          of authorization for any Transaction, on Account of the Cardholder
          having exceeded the preset limit mutually agreed by us with our
          acquiring bank from time to time
        </p>
      </>
    );
  }

  return (
    <div className={classes.view}>
      <HomeNav />
      <div className={classes.body}>
        <div className={classes.bodyDi}>
          <div className={classes.buttons}>
            <button
              onClick={() => {
                setState("privacy");
              }}
              className={state == "privacy" ? classes.active : ""}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setState("refund");
              }}
              className={state == "refund" ? classes.active : ""}
            >
              Cancelation & Refund
            </button>
            <button
              onClick={() => {
                setState("conditions");
              }}
              className={state == "conditions" ? classes.active : ""}
            >
              Terms & Conditions
            </button>
          </div>
          <div className={classes.policy}>{content}</div>
        </div>
      </div>
      <footer className={classes.footer} id="contactUs">
        <div className={classes.col}>
          <div className={classes.heading}>Contact us (for any queries):</div>
          <div className={classes.content}>
            <p>
              <MdMail size={25} />
              <span>software.yeswecan@gmail.com</span>
            </p>
            <p>
              <FaPhoneAlt size={25} /> <span>+91 9853324365</span>
            </p>
          </div>
          <div className={classes.content} style={{ paddingTop: "1rem" }}>
            <p>
              <a href="/policies">Policies Page</a>
            </p>
          </div>
        </div>
        <div className={classes.col}>
          <div className={classes.heading}>Follow us on Social Media:</div>
          <div className={classes.content}>
            <p>
              <ImFacebook2 size={25} />
              <span>
                <a
                  href="https://www.facebook.com/yeswecansadhana"
                  target="_blank"
                >
                  Facebook
                </a>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Policies;
