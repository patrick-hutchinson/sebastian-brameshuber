"use client";

import { usePathname } from "next/navigation";

import AnimationLink from "../Animation/AnimationLink";

import styles from "./Footer.module.css";

const Footer = ({ site }) => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // const hiddenRoutes = ["/enter"];
  // const hideFooter = hiddenRoutes.includes(pathname);

  // if (hideFooter) return;

  return (
    <footer className={styles.footer} typo="fineprint">
      <span className={styles.copyright}>{`© ${site.title}, ${currentYear}`}</span>

      <div className={styles.footerLinks}>
        {site.socials.map((social, index) => (
          <span key={social.platform}>
            <AnimationLink path={social.link}>{social.platform}</AnimationLink>
            {index !== site.socials.length - 1 && ",\u00A0"}
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
