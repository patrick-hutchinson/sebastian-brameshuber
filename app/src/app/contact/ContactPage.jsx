import styles from "./ContactPage.module.css";

const ContactPage = ({ site }) => {
  console.log(site, "site");
  return (
    <main>
      <div typo="display">
        {site.owner && <div>{site.owner}</div>}

        <div>{`Based in ${site.address.city}, ${site.address.country}`}</div>

        {site.phone && (
          <div>
            <a href={`tel:${site.phone}`}>{site.phone}</a>
          </div>
        )}
        {site.email && (
          <div>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        )}
        {site.socials && (
          <div className={styles.socialAccount}>
            {site.socials.map((social) => (
              <a href={social.link}>({social.platform})</a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ContactPage;
