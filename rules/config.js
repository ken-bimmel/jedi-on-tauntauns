/**
 * The semantic versioning version number of the rules text.
 */
const RULES_VERSION = "0.5.5";
const documentTitle = `Jedi on Tauntauns v${RULES_VERSION}`;
const documentName = `./rules/${documentTitle}.pdf`;

/*
 * See https://www.npmjs.com/package/md-to-pdf#options for more details on the
 * config file structure and options
 */

module.exports = {
  dest: documentName,
  document_title: documentTitle,
  page_media_type: "print",
};
