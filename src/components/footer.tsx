const Footer = () => {
  const githubURL = "https://github.com/ThaiDuongVu";
  const linkedinURL = "https://www.linkedin.com/in/duong-vu-290901/";

  return (
    <footer className="footer bg-body-tertiary mt-auto">
      <br />
      <div className="container">
        <div className="row">
          <div className="col-8 text-start">
            <p className="text-body-tertiary">
              Developed by Duong Vu
            </p>
          </div>
          <div className="col-4 text-end">
            <a href={githubURL} className="p-2" target="_blank" aria-label="GitHub"><i className="bi bi-github text-body-tertiary"></i></a>
            <a href={linkedinURL} className="p-2" target="_blank" aria-label="LinkedIn"><i className="bi bi-linkedin text-body-tertiary"></i></a>
            <a href="mailto:duong1.vu@torontomu.ca" target="_blank" className="p-2" aria-label="Email"><i className="bi bi-envelope-fill text-body-tertiary"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;