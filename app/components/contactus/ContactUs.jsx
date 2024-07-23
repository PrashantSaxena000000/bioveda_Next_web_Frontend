"use client";
import React, { useEffect, useState } from "react";
import styles from "./contactus.module.scss";
import { Button } from "react-bootstrap";
import PageHeading from "../../common/PageHeading/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import { contactUs, contactusReasons } from "../redux/actions/authActions";
import { toast } from "react-toastify";
import Link from "next/link";
const ContactUs = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({});
  const isLoggedIn = useSelector((state) => state?.home?.isLoggedIn);
  const contactusReviewsDetails = useSelector(
    (state) => state?.home?.contactusReviewsDetails?.reasons
  );

  const contactChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(contactusReasons());
  }, []);

  const onContactFormSubmit = (e) => {
    e.preventDefault();
    if (!values?.name) {
      toast.error("Enter Your Name");
    } else if (values?.name && !values?.name?.trim()) {
      toast.error("Name Can't be only Whitespace ");
    } else {
      const emailValidationResult = isValidEmail(values?.email);
      if (emailValidationResult !== true) {
        toast.error(emailValidationResult);
      } else if (!values?.phone_number) {
        toast.error("Enter Your Phone Number");
      } else if (!values?.message) {
        toast.error("Enter Your Message");
      } else if (values?.message && !values?.message?.trim()) {
        toast.error("Message Can't be only Whitespace ");
      } else if (!values?.help) {
        toast.error("Select How Can We Help you");
      } else {
        const data = {
          name: values?.name,
          email: values?.email,
          phone_number: values?.phone_number,
          message: values?.message,
          contact_us_reason_id: values?.help,
        };
        dispatch(contactUs(data));
      }
    }
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Enter a valid Email Address";
    }
    return true;
  };
  return (
    <>
      <div className={styles.contact_Wrapper}>
        <PageHeading pageName="Contact Us" />
        <div className={styles.background_secn}>
          <div className="container">
            <div className={styles.main_section}>
              <div className={styles.leftSection}>
                <h5>Get In TOUCH</h5>
                <h4>Visit one of our agency contact us today </h4>
                <p>
                  Fill out the form or write to us at{" "}
                  <span>info@marketplace.com</span>
                </p>

                <div className={styles.supportBtns}>
                  <svg
                    width="35"
                    height="38"
                    viewBox="0 0 35 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_3310_1474)">
                      <path
                        d="M14.9591 37.1065C13.8647 36.7763 13.1688 36.077 12.9999 34.9265C12.8092 33.6265 13.7757 32.3086 15.0988 32.1702C16.5659 32.033 18.0424 32.0291 19.5101 32.1586C20.4515 32.2312 21.1212 32.7762 21.4938 33.6438C21.6036 33.8993 21.743 33.9783 22.0086 33.976C23.3734 33.9646 24.7383 33.9812 26.1029 33.9674C28.5164 33.9432 30.4822 31.7767 30.3059 29.3657C30.2866 29.097 30.1417 29.0895 29.946 29.0898C28.883 29.0922 27.8201 29.0922 26.7571 29.0898C25.5009 29.0856 24.7274 28.3119 24.7262 27.054C24.7237 24.2882 24.73 21.5224 24.7226 18.7566C24.7204 17.9384 25.0254 17.3035 25.7417 16.8885C25.8803 16.8082 25.964 16.7164 25.959 16.5482C25.9106 15.0301 26.0694 13.5077 25.8149 11.9937C25.228 8.50283 22.1332 5.52638 18.6119 5.08719C14.7931 4.61089 11.4945 6.29837 9.68558 9.6772C9.08807 10.7886 8.76659 12.0275 8.74825 13.2892C8.7297 14.3275 8.74728 15.3668 8.73791 16.4051C8.73569 16.644 8.79512 16.8005 9.01969 16.9318C9.66828 17.311 9.97315 17.9049 9.97402 18.6498C9.97711 21.464 9.97711 24.2781 9.97402 27.0922C9.9718 28.3041 9.18696 29.0861 7.97751 29.0895C6.51605 29.0936 5.05459 29.1006 3.59333 29.084C1.66359 29.0623 0.0242321 27.4117 0.00944746 25.4762C-0.00343678 23.7612 -0.00378977 22.0462 0.00838583 20.3311C0.0219862 19.4658 0.336373 18.6321 0.897594 17.9732C1.45882 17.3143 2.23187 16.8714 3.08408 16.7203C3.70503 16.6148 3.69547 16.6146 3.70716 15.9979C3.72996 14.7914 3.65884 13.5847 3.76698 12.378C3.97713 9.834 4.91616 7.40454 6.4716 5.38056C8.65548 2.51601 11.5456 0.79326 15.0829 0.146697C15.4018 0.088718 15.7252 0.0485193 16.0464 0.000106812H18.6554C18.7123 0.0188174 18.7705 0.0336996 18.8294 0.0446539C22.7763 0.519309 25.9529 2.34449 28.3333 5.52222C29.8594 7.55961 30.7123 9.86447 30.9358 12.4058C31.0421 13.6119 30.9716 14.8181 30.9944 16.0241C31.0057 16.6192 30.9965 16.6194 31.5709 16.7148C32.4374 16.8553 33.2261 17.2978 33.7976 17.964C34.3691 18.6302 34.6865 19.4771 34.6935 20.3548C34.7025 22.0449 34.7025 23.735 34.6935 25.4252C34.6873 26.2101 34.43 26.9725 33.9593 27.6006C33.4886 28.2288 32.8291 28.6897 32.0775 28.916C31.7093 29.0223 31.6257 29.1866 31.6233 29.543C31.6095 31.3567 30.9414 32.8808 29.5247 34.0429C28.4961 34.8867 27.2962 35.2821 25.977 35.3007C24.6493 35.3193 23.3212 35.3049 21.9933 35.3058C21.8128 35.3058 21.6348 35.2886 21.5478 35.5177C21.2273 36.3628 20.5834 36.8485 19.7426 37.1067L14.9591 37.1065ZM5.0375 14.4761C5.0375 15.0437 5.05576 15.6121 5.03093 16.1787C5.01527 16.5344 5.11412 16.6836 5.49475 16.6588C5.9638 16.6283 6.43634 16.6522 6.90732 16.6514C7.40546 16.6507 7.3985 16.65 7.40826 16.1531C7.43531 14.7788 7.33975 13.403 7.539 12.0312C8.30548 6.75583 13.5495 2.91037 18.8213 3.77271C23.7834 4.58442 27.28 8.68305 27.2947 13.7065C27.2972 14.5761 27.2987 15.4458 27.2933 16.3155C27.2921 16.5308 27.3438 16.6581 27.5945 16.6537C28.1862 16.6441 28.7782 16.6461 29.3699 16.6527C29.5921 16.6552 29.6688 16.5509 29.6641 16.343C29.6327 14.9677 29.7402 13.5896 29.5886 12.2168C29.2702 9.33396 28.08 6.84908 26.0079 4.84059C23.0102 1.93477 19.3899 0.772387 15.2751 1.47983C10.9654 2.22051 7.90745 4.69081 6.07 8.64797C5.21375 10.4909 4.93352 12.454 5.0375 14.4761ZM4.93845 22.8991C4.93845 21.3917 4.93206 19.8836 4.94376 18.376C4.94607 18.0758 4.84606 17.9634 4.54757 17.9825C4.24714 18.0018 3.94458 17.9825 3.64319 17.9902C2.40698 18.0213 1.36752 19.0049 1.34548 20.241C1.31417 22.0013 1.31775 23.763 1.34452 25.5236C1.36152 26.639 2.22058 27.5574 3.31909 27.7443C3.71528 27.812 4.11292 27.783 4.50872 27.8098C4.83679 27.8319 4.94907 27.7265 4.9453 27.3861C4.92907 25.8907 4.93854 24.3948 4.93845 22.8991ZM29.7632 22.9048C29.7632 24.4123 29.7679 25.9202 29.7587 27.4279C29.7571 27.7008 29.8274 27.8347 30.1259 27.8084C30.3653 27.7873 30.608 27.8074 30.8492 27.8032C32.4635 27.7742 33.4088 26.5694 33.3798 25.2646C33.3434 23.625 33.3838 21.9838 33.363 20.3437C33.3666 19.7886 33.172 19.2504 32.8141 18.8261C32.4563 18.4017 31.9587 18.1189 31.411 18.0287C31.0121 17.9582 30.5926 18.0129 30.1848 17.9816C29.8443 17.9554 29.7543 18.0919 29.7574 18.418C29.7709 19.9135 29.7629 21.4096 29.763 22.9048H29.7632ZM6.27264 22.8767C6.27264 23.2507 6.27264 23.6248 6.27264 23.9988C6.27264 25.1449 6.27264 26.2911 6.27264 27.4373C6.27264 27.6248 6.26298 27.8095 6.53954 27.8045C7.0341 27.7966 7.52943 27.816 8.02322 27.7942C8.41371 27.7769 8.63548 27.5481 8.63616 27.1747C8.64086 24.3152 8.6407 21.4558 8.63567 18.5964C8.6349 18.1941 8.43275 18.001 8.02979 17.9902C7.61978 17.9794 7.20939 17.9858 6.79919 17.9861C6.27399 17.9861 6.27284 17.987 6.27264 18.4966C6.27213 19.9568 6.27219 21.4169 6.27264 22.8767ZM28.4289 22.9182C28.4289 21.41 28.4214 19.9018 28.4348 18.3937C28.4376 18.0739 28.3299 17.9655 28.0157 17.9813C27.5944 18.0024 27.1713 17.9825 26.7491 17.9881C26.2539 17.9946 26.0638 18.1755 26.063 18.664C26.0595 21.4752 26.0594 24.2864 26.0625 27.0977C26.063 27.5601 26.2804 27.7847 26.7448 27.8C27.1546 27.8134 27.567 27.7793 27.9748 27.8115C28.3568 27.8416 28.44 27.6874 28.4359 27.334C28.419 25.8622 28.4289 24.3902 28.4289 22.9182ZM17.341 33.4326V33.4349C16.7138 33.4349 16.086 33.4202 15.4592 33.439C15.1723 33.4424 14.8968 33.5526 14.6867 33.748C14.4765 33.9434 14.3466 34.2101 14.3224 34.4961C14.2701 35.1757 14.6422 35.6718 15.3022 35.7973C15.4199 35.8232 15.5398 35.8381 15.6602 35.8421C16.7821 35.8456 17.9042 35.8548 19.026 35.841C19.8854 35.8304 20.3885 35.3629 20.3841 34.6213C20.379 33.8782 19.866 33.4349 19.0059 33.4328C18.4507 33.4314 17.8957 33.4326 17.341 33.4326Z"
                        fill="#4DBA4D"
                      />
                      <path
                        d="M17.3651 21.0569C13.273 21.0802 9.90251 17.7456 9.87661 13.6479C9.85091 9.56548 13.2093 6.16008 17.2786 6.14201C21.4258 6.12365 24.811 9.45986 24.8235 13.5779C24.8365 17.6854 21.4977 21.0329 17.3651 21.0569ZM17.3458 7.47611C16.5408 7.47271 15.7431 7.6284 14.9985 7.93422C14.2539 8.24004 13.5771 8.68997 13.0069 9.25817C12.4367 9.82636 11.9844 10.5016 11.676 11.2451C11.3676 11.9887 11.2091 12.7858 11.2097 13.5908C11.207 16.9836 13.9756 19.7627 17.3554 19.7602C18.9809 19.7513 20.5371 19.1012 21.6858 17.9511C22.8346 16.8011 23.4829 15.2442 23.49 13.6187C23.4941 12.8108 23.3379 12.01 23.0306 11.2628C22.7232 10.5156 22.2708 9.83674 21.6994 9.26551C21.128 8.69428 20.449 8.24201 19.7017 7.93486C18.9544 7.62772 18.1537 7.47179 17.3458 7.47611Z"
                        fill="#4DBA4D"
                      />
                      <path
                        d="M18.0175 14.4233C18.0175 15.2201 18.0177 16.0169 18.018 16.8138C18.0185 17.279 18.0196 17.279 18.4988 17.2926C19.0799 17.3092 19.4016 17.7623 19.1622 18.2284C19.1187 18.3294 19.0468 18.4155 18.9552 18.4764C18.8636 18.5373 18.7564 18.5703 18.6464 18.5714C17.7893 18.5778 16.9319 18.5835 16.0748 18.5704C15.9094 18.5671 15.7518 18.4988 15.6364 18.3802C15.5209 18.2615 15.4568 18.1022 15.458 17.9367C15.4602 17.7721 15.5248 17.6144 15.6388 17.4956C15.7528 17.3768 15.9076 17.3057 16.072 17.2968C16.6829 17.2399 16.6829 17.2399 16.6829 16.6178C16.6829 15.3621 16.6752 14.1064 16.6883 12.8508C16.6915 12.5379 16.625 12.3904 16.27 12.4031C15.7649 12.4209 15.4469 12.1312 15.4573 11.7321C15.4669 11.3461 15.775 11.0934 16.2659 11.0804C16.5676 11.0724 16.8696 11.0733 17.1714 11.0797C17.7609 11.0922 18.0106 11.3368 18.0155 11.924C18.0224 12.7573 18.0171 13.5905 18.0175 14.4233Z"
                        fill="#4DBA4D"
                      />
                      <path
                        d="M18.0081 9.27829C18.0007 9.44751 17.9311 9.60806 17.8127 9.72919C17.6943 9.85032 17.5354 9.92353 17.3664 9.9348C17.1909 9.9318 17.0232 9.86171 16.8978 9.73893C16.7723 9.61616 16.6987 9.45001 16.6919 9.27462C16.6993 9.09919 16.7737 8.9333 16.8998 8.81117C17.026 8.68904 17.1942 8.62 17.3698 8.61829C17.5388 8.63042 17.6973 8.70447 17.8151 8.82625C17.9329 8.94803 18.0016 9.10899 18.0081 9.27829Z"
                        fill="#4DBA4D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3310_1474">
                        <rect width="34.7" height="37.1066" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <Link href="/ask-us">
                    <p>Support</p>
                  </Link>
                </div>
              </div>

              <div className={styles.rightSection}>
                <div className={styles.formDiv}>
                  <form onSubmit={onContactFormSubmit}>
                    <select
                      name="help"
                      id=""
                      onChange={(e) => contactChangeHandler(e)}
                    >
                      <option value="" hidden>
                        How can we help you?
                      </option>
                      {contactusReviewsDetails?.map((item, key) => {
                        return (
                          <option value={item?.id} key={key}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </select>

                    <input
                      type="text"
                      placeholder="Name*"
                      onChange={(e) => contactChangeHandler(e)}
                      name="name"
                    />
                    <input
                      type="text"
                      placeholder="Email*"
                      onChange={(e) => contactChangeHandler(e)}
                      name="email"
                    />
                    <input
                      type="number"
                      placeholder="Phone*"
                      min={0}
                      onChange={(e) => contactChangeHandler(e)}
                      name="phone_number"
                    />
                    <textarea
                      name="message"
                      id=""
                      cols="30"
                      rows="5"
                      placeholder="Type Text*"
                      onChange={(e) => contactChangeHandler(e)}
                    ></textarea>
                    <Button type="submit"> Submit</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
