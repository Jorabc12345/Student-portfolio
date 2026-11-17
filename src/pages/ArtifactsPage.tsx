import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Download, FileText, X } from "lucide-react";
import { level1Subjects } from "../data/level1Content";
import { useConfirmationDialog } from "../components/useConfirmationDialog";
import {
  getPortfolioItem,
  setPortfolioItem,
  subscribeToPortfolioItem,
} from "../services/portfolioStorage";
import {
  deletePortfolioArtifact,
  uploadPortfolioArtifact,
} from "../services/portfolioArtifactStorage";

type ArtifactFileRecord = {
  fileName: string;
  fileType: string;
  fileSize: number;
  storagePath?: string;
  objectUrl?: string;
};

type ArtifactRecord = {
  id: string;
  fileName: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: number;
  subject: string;
  domain: string;
  plo: string;
  uploadedAt: string;
  storagePath?: string;
  objectUrl?: string;
  files?: ArtifactFileRecord[];
};

const STORAGE_KEY = "buksu-artifacts";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES_PER_ARTIFACT = 5;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const PLOS = Array.from({ length: 11 }, (_, index) => `PLO ${index + 1}`);

function loadArtifacts(): ArtifactRecord[] {
  const savedArtifacts = getPortfolioItem(STORAGE_KEY);

  if (!savedArtifacts) {
    return [];
  }

  try {
    return JSON.parse(savedArtifacts) as ArtifactRecord[];
  } catch (error) {
    console.error("Unable to read saved artifacts.", error);
    return [];
  }
}

function formatFileSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getArtifactFiles(artifact: ArtifactRecord): ArtifactFileRecord[] {
  return artifact.files?.length
    ? artifact.files
    : [
        {
          fileName: artifact.fileName,
          fileType: artifact.fileType,
          fileSize: artifact.fileSize,
          storagePath: artifact.storagePath,
          objectUrl: artifact.objectUrl,
        },
      ];
}

export default function ArtifactsPage({ readOnly = false }: { readOnly?: boolean }) {
  const [artifacts, setArtifacts] = useState(loadArtifacts);
  const [preview, setPreview] = useState<{
    artifactTitle: string;
    file: ArtifactFileRecord;
  } | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: level1Subjects[0].code,
    domain: "",
    plo: "",
    confidentiality: false,
    references: false,
    collaborators: false,
    permissions: false,
    aiUse: false,
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [fileError, setFileError] = useState("");
  const { requestConfirmation, confirmationDialog } = useConfirmationDialog();

  const closePreview = useCallback(() => setPreview(null), []);

  useEffect(
    () =>
      subscribeToPortfolioItem(STORAGE_KEY, () => {
        setArtifacts(loadArtifacts());
      }),
    [],
  );

  const updateForm = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    setSelectedFiles([]);
    setFileError("");
    setError("");

    if (files.length === 0) {
      return;
    }

    if (files.some((file) => !ACCEPTED_TYPES.includes(file.type))) {
      setFileError(
        "One or more file types are not supported. Choose photos, PDFs, or office documents.",
      );
      return;
    }

    if (files.length > MAX_FILES_PER_ARTIFACT) {
      setFileError(`Choose no more than ${MAX_FILES_PER_ARTIFACT} photos for one artifact.`);
      return;
    }

    if (files.length > 1 && files.some((file) => !file.type.startsWith("image/"))) {
      setFileError("Choose only photos together, or upload one document by itself.");
      return;
    }

    const oversizedFile = files.find((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFile) {
      setFileError(`${oversizedFile.name} is larger than the 10 MB limit.`);
      return;
    }

    setSelectedFiles(files);
    setForm((current) => ({
      ...current,
      title: current.title || files[0].name.replace(/\.[^/.]+$/, ""),
    }));
  };

  const uploadArtifact = async () => {
    setValidationAttempted(true);
    setError("");
    setMessage("");
    if (
      selectedFiles.length === 0 ||
      !form.title.trim() ||
      !form.confidentiality ||
      !form.references ||
      !form.collaborators ||
      !form.permissions ||
      !form.aiUse
    ) {
      return;
    }

    setUploading(true);
    const uploadedFiles: ArtifactFileRecord[] = [];
    try {
      const id = crypto.randomUUID();
      for (const [index, file] of selectedFiles.entries()) {
        const uploadedFile = await uploadPortfolioArtifact(file, id, index);
        uploadedFiles.push({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          storagePath: uploadedFile.path,
          objectUrl: uploadedFile.publicUrl,
        });
      }

      const firstFile = uploadedFiles[0];
      const artifact: ArtifactRecord = {
        id,
        fileName: firstFile.fileName,
        title: form.title.trim(),
        description: form.description.trim(),
        fileType: firstFile.fileType,
        fileSize: firstFile.fileSize,
        subject: form.subject,
        domain: form.domain,
        plo: form.plo,
        uploadedAt: new Date().toISOString(),
        storagePath: firstFile.storagePath,
        objectUrl: firstFile.objectUrl,
        files: uploadedFiles,
      };
      const nextArtifacts = [artifact, ...artifacts];
      await setPortfolioItem(STORAGE_KEY, JSON.stringify(nextArtifacts));
      setArtifacts(nextArtifacts);
      setSelectedFiles([]);
      setFileError("");
      setValidationAttempted(false);
      setMessage("Artifact uploaded and shared publicly.");
      setForm((current) => ({
        ...current,
        title: "",
        description: "",
        domain: "",
        plo: "",
        confidentiality: false,
        references: false,
        collaborators: false,
        permissions: false,
        aiUse: false,
      }));
    } catch (uploadError: unknown) {
      console.error("Unable to upload the portfolio artifact.", uploadError);
      let cleanupMessage = "";
      const uploadedPaths = uploadedFiles
        .map((file) => file.storagePath)
        .filter((path): path is string => Boolean(path));
      if (uploadedPaths.length > 0) {
        try {
          await deletePortfolioArtifact(uploadedPaths);
        } catch (cleanupError) {
          console.error("Unable to remove the unlisted uploaded artifact.", cleanupError);
          cleanupMessage = " The uploaded file may still be publicly accessible; please contact the site owner to remove it.";
        }
      }
      setError(
        `The artifact could not be uploaded to the shared portfolio. ${
          uploadError instanceof Error ? uploadError.message : String(uploadError)
        }${cleanupMessage}`,
      );
    } finally {
      setUploading(false);
    }
  };

  const deleteArtifact = async (artifact: ArtifactRecord) => {
    const confirmed = await requestConfirmation({
      eyebrow: "Delete artifact",
      title: "Remove this evidence?",
      description: `"${artifact.title}" and its attached files will be permanently removed from the portfolio.`,
      confirmLabel: "Delete artifact",
      destructive: true,
    });
    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");
    try {
      const storagePaths = getArtifactFiles(artifact)
        .map((file) => file.storagePath)
        .filter((path): path is string => Boolean(path));
      if (storagePaths.length > 0) {
        await deletePortfolioArtifact(storagePaths);
      }
      const nextArtifacts = artifacts.filter((item) => item.id !== artifact.id);
      await setPortfolioItem(STORAGE_KEY, JSON.stringify(nextArtifacts));
      setArtifacts(nextArtifacts);
      setMessage("Artifact deleted from the shared portfolio.");
    } catch (deleteError: unknown) {
      console.error("Unable to delete the portfolio artifact.", deleteError);
      setError(
        `The artifact could not be fully deleted. ${
          deleteError instanceof Error ? deleteError.message : String(deleteError)
        }`,
      );
    }
  };

  const selectedSubject = level1Subjects.find((subject) => subject.code === form.subject);
  const domains = selectedSubject?.domains ?? [];
  const fileValidationMessage =
    fileError ||
    (validationAttempted && selectedFiles.length === 0
      ? "Choose 1–5 photos or one document before uploading."
      : "");
  const selectedFilesLabel =
    selectedFiles.length > 1
      ? `${selectedFiles.length} photos selected`
      : selectedFiles[0]?.name || "Choose 1–5 photos or one document";
  const titleValidationMessage =
    validationAttempted && !form.title.trim() ? "Add a title for this artifact." : "";
  const acknowledgementValidationMessage = validationAttempted
    ? "This acknowledgement is required before uploading."
    : "";
  const acknowledgementError = (checked: boolean) =>
    checked ? "" : acknowledgementValidationMessage;

  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">Your evidence</p>
        <h1>Artifacts</h1>
        <p>Share your evidence with portfolio visitors. Do not upload confidential or patient-identifying material.</p>
      </div>
      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}
      {!readOnly && <section className="artifact-upload-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Add evidence</p>
            <h2>Upload an artifact</h2>
          </div>
          <span className="private-label">Public portfolio</span>
        </div>
        <div className="artifact-file-field">
          <label className={`artifact-file-picker ${fileValidationMessage ? "has-error" : ""}`}>
            <span>{selectedFilesLabel}</span>
            <small>
              Add 1–5 photos to this artifact, or upload one PDF or office document. Maximum 10 MB
              per file.
            </small>
            <input
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              multiple
              onChange={handleFiles}
              aria-invalid={Boolean(fileValidationMessage)}
              aria-describedby={fileValidationMessage ? "artifact-file-error" : undefined}
            />
          </label>
          {selectedFiles.length > 0 && (
            <ul className="artifact-selected-files" aria-label="Selected artifact files">
              {selectedFiles.map((file, index) => (
                <li key={`${file.name}-${file.lastModified}-${index}`}>
                  {file.name} · {formatFileSize(file.size)}
                </li>
              ))}
            </ul>
          )}
          {fileValidationMessage && (
            <small className="field-validation-error" id="artifact-file-error">
              {fileValidationMessage}
            </small>
          )}
        </div>
        <div className="artifact-form-grid">
          <label>
            Title
            <input
              aria-invalid={Boolean(titleValidationMessage)}
              aria-describedby={titleValidationMessage ? "artifact-title-error" : undefined}
              value={form.title}
              onChange={(event) => updateForm("title", event.target.value)}
              placeholder="Artifact title"
            />
            {titleValidationMessage && (
              <small className="field-validation-error" id="artifact-title-error">
                {titleValidationMessage}
              </small>
            )}
          </label>
          <label>
            Subject
            <select
              value={form.subject}
              onChange={(event) => {
                updateForm("subject", event.target.value);
                updateForm("domain", "");
              }}
            >
              {level1Subjects.map((subject) => (
                <option key={subject.code} value={subject.code}>
                  {subject.code} - {subject.name}
                </option>
              ))}
            </select>
          </label>
          <label className="wide-field">
            Description and significance
            <textarea
              value={form.description}
              onChange={(event) => updateForm("description", event.target.value)}
              placeholder="Explain what this artifact demonstrates and why you selected it."
              rows={4}
            />
          </label>
          <label>
            Related domain
            <select
              value={form.domain}
              onChange={(event) => updateForm("domain", event.target.value)}
            >
              <option value="">Select a domain (optional)</option>
              {domains.map((domain) => (
                <option key={domain.id} value={domain.name}>
                  {domain.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Related PLO
            <select value={form.plo} onChange={(event) => updateForm("plo", event.target.value)}>
              <option value="">Select a PLO (optional)</option>
              {PLOS.map((plo) => (
                <option key={plo} value={plo}>
                  {plo}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="artifact-acknowledgements">
          <strong>Academic integrity and permissions</strong>
          <Acknowledgement
            id="artifact-confidentiality"
            checked={form.confidentiality}
            error={acknowledgementError(form.confidentiality)}
            onChange={(value) => updateForm("confidentiality", value)}
            text="I confirm this file contains no patient-identifying or confidential information."
          />
          <Acknowledgement
            id="artifact-references"
            checked={form.references}
            error={acknowledgementError(form.references)}
            onChange={(value) => updateForm("references", value)}
            text="I have acknowledged references and sources used in this artifact."
          />
          <Acknowledgement
            id="artifact-collaborators"
            checked={form.collaborators}
            error={acknowledgementError(form.collaborators)}
            onChange={(value) => updateForm("collaborators", value)}
            text="I have identified collaborators and my own contribution."
          />
          <Acknowledgement
            id="artifact-permissions"
            checked={form.permissions}
            error={acknowledgementError(form.permissions)}
            onChange={(value) => updateForm("permissions", value)}
            text="I have permission to share this academic artifact publicly on my portfolio."
          />
          <Acknowledgement
            id="artifact-ai-use"
            checked={form.aiUse}
            error={acknowledgementError(form.aiUse)}
            onChange={(value) => updateForm("aiUse", value)}
            text="I have disclosed any artificial-intelligence use required by academic policy."
          />
        </div>
        {uploading && (
          <div className="upload-progress" aria-label="Uploading artifact">
            <div style={{ width: "100%" }} />
            <span>Uploading and saving to the shared portfolio…</span>
          </div>
        )}
        <button
          className="primary-button compact-button"
          onClick={() => void uploadArtifact()}
          disabled={uploading}
        >
          {uploading ? "Uploading…" : "Upload artifact"}
        </button>
      </section>}
      <section className="list-card artifact-list">
        <div className="list-header">
          <div>
            <p className="eyebrow">Your evidence</p>
            <h2>Uploaded artifacts</h2>
          </div>
          <span className="private-label">{artifacts.length} public</span>
        </div>
        {artifacts.length === 0 ? (
          <div className="empty-guidance">
            <span>✧</span>
            <h2>No artifacts yet</h2>
            <p>
              Upload de-identified evidence and connect it to your reflections, domains, or PLOs.
            </p>
          </div>
        ) : (
          artifacts.map((artifact) => {
            const files = getArtifactFiles(artifact);
            const photoFiles = files.filter((file) => file.fileType.startsWith("image/"));
            const documentFiles = files.filter((file) => !file.fileType.startsWith("image/"));
            const totalFileSize = files.reduce((total, file) => total + file.fileSize, 0);

            return (
              <article className="artifact-row" key={artifact.id}>
                <span className="file-icon">{photoFiles.length > 0 ? "IMG" : "DOC"}</span>
                <div className="artifact-row-copy">
                  <strong>{artifact.title}</strong>
                  <small>
                    {files.length === 1
                      ? `${files[0].fileName} · ${formatFileSize(files[0].fileSize)} · ${artifact.subject}`
                      : `${photoFiles.length} photos · ${formatFileSize(totalFileSize)} total · ${artifact.subject}`}
                  </small>
                  {artifact.description && <p>{artifact.description}</p>}
                  <small>
                    {artifact.domain || "No domain"} · {artifact.plo || "No PLO"} ·{" "}
                    {new Date(artifact.uploadedAt).toLocaleDateString()}
                  </small>
                  {photoFiles.length > 0 && (
                    <div className="artifact-photo-grid">
                      {photoFiles.map((file, index) => (
                        <div
                          className="artifact-photo-card"
                          key={`${file.storagePath ?? file.fileName}-${index}`}
                        >
                          {file.objectUrl ? (
                            <>
                              <button
                                type="button"
                                className="artifact-photo-preview"
                                onClick={() => setPreview({ artifactTitle: artifact.title, file })}
                                aria-label={`Preview ${file.fileName}`}
                              >
                                <img src={file.objectUrl} alt="" loading="lazy" />
                                <span>{file.fileName}</span>
                              </button>
                              <a
                                className="text-button"
                                href={file.objectUrl}
                                download={file.fileName}
                              >
                                Download
                              </a>
                            </>
                          ) : (
                            <span className="artifact-missing-file">{file.fileName}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {documentFiles.map((file, index) => (
                    <div
                      className="artifact-document-actions"
                      key={`${file.storagePath ?? file.fileName}-${index}`}
                    >
                      <small>{file.fileName} · {formatFileSize(file.fileSize)}</small>
                      {file.objectUrl ? (
                        <>
                          <button
                            type="button"
                            className="text-button"
                            onClick={() => setPreview({ artifactTitle: artifact.title, file })}
                          >
                            Preview
                          </button>
                          <a
                            className="text-button"
                            href={file.objectUrl}
                            download={file.fileName}
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <span className="artifact-missing-file">File needs re-upload</span>
                      )}
                    </div>
                  ))}
                </div>
                <span className="artifact-state">
                  {files.every((file) => file.objectUrl) ? "Public" : "File needs re-upload"}
                </span>
                {!readOnly && (
                  <button className="danger-button" onClick={() => deleteArtifact(artifact)}>
                    Delete
                  </button>
                )}
              </article>
            );
          })
        )}
      </section>
      {confirmationDialog}
      {preview && (
        <ArtifactPreviewDialog
          artifactTitle={preview.artifactTitle}
          file={preview.file}
          onClose={closePreview}
        />
      )}
    </>
  );
}

function ArtifactPreviewDialog({
  artifactTitle,
  file,
  onClose,
}: {
  artifactTitle: string;
  file: ArtifactFileRecord;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements =
      dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled), a[href], [tabindex]:not([tabindex='-1'])",
      );
    if (!focusableElements?.length) {
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const isImage = file.fileType.startsWith("image/");
  const isPdf = file.fileType === "application/pdf";

  return (
    <div className="artifact-preview-backdrop">
      <section
        ref={dialogRef}
        className="artifact-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="artifact-preview-title"
        onKeyDown={handleKeyDown}
      >
        <header className="artifact-preview-header">
          <div className="artifact-preview-heading">
            <p className="eyebrow">Previewing artifact</p>
            <h2 id="artifact-preview-title">{file.fileName}</h2>
            <small>{artifactTitle}</small>
          </div>
          <div className="artifact-preview-actions">
            {file.objectUrl && (
              <a className="artifact-preview-download" href={file.objectUrl} download={file.fileName}>
                <Download size={16} aria-hidden="true" />
                Download
              </a>
            )}
            <button
              ref={closeButtonRef}
              type="button"
              className="artifact-preview-close"
              onClick={onClose}
              aria-label="Close preview"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </header>
        <div className="artifact-preview-stage">
          {file.objectUrl && isImage ? (
            <img className="artifact-preview-image" src={file.objectUrl} alt={file.fileName} />
          ) : file.objectUrl && isPdf ? (
            <iframe
              className="artifact-preview-document"
              src={file.objectUrl}
              title={`Preview of ${file.fileName}`}
            />
          ) : (
            <div className="artifact-preview-unavailable">
              <span className="artifact-preview-file-icon" aria-hidden="true">
                <FileText size={28} />
              </span>
              <h3>Preview isn’t available for this file type</h3>
              <p>
                This file is still safely stored with the artifact. Download it to open it in a
                compatible app.
              </p>
              {file.objectUrl && (
                <a className="artifact-preview-download" href={file.objectUrl} download={file.fileName}>
                  <Download size={16} aria-hidden="true" />
                  Download file
                </a>
              )}
            </div>
          )}
        </div>
        <footer className="artifact-preview-footer">
          <span>{formatFileSize(file.fileSize)}</span>
          <button type="button" className="artifact-preview-back" onClick={onClose}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to artifacts
          </button>
        </footer>
      </section>
    </div>
  );
}

function Acknowledgement({
  id,
  checked,
  error,
  onChange,
  text,
}: {
  id: string;
  checked: boolean;
  error: string;
  onChange: (value: boolean) => void;
  text: string;
}) {
  return (
    <label className="artifact-check">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <span className="artifact-check-copy">
        <span>{text}</span>
        {error && (
          <small className="field-validation-error" id={`${id}-error`}>
            {error}
          </small>
        )}
      </span>
    </label>
  );
}
