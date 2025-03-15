const RULES_VERSION = "0.3";
const documentTitle = `Jedi on Tauntauns v${RULES_VERSION}`;
const documentName = `./rules/${documentTitle}.pdf`;

module.exports = {
  dest: documentName,
  document_title: documentTitle,
  page_media_type: "print",
};
