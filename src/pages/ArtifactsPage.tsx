import { ChangeEvent, useEffect, useState } from "react";
import { level1Subjects } from "../data/level1Content";
import {
  getPortfolioItem,
  setPortfolioItem,
  subscribeToPortfolioItem,
} from "../services/portfolioStorage";
import {
  deletePortfolioArtifact,
  uploadPortfolioArtifact,
} from "../services/portfolioArtifactStorage";

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
};

const STORAGE_KEY = "buksu-artifacts";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
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

export default function ArtifactsPage({ readOnly = false }: { readOnly?: boolean }) {
  const [artifacts, setArtifacts] = useState(loadArtifacts);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    setSelectedFile(null);
    setFileError("");
    setError("");

    if (!file) {
      return;
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError(
        "This file type is not supported. Choose a PDF, office document, image, or presentation.",
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("This file is larger than the 10 MB limit.");
      return;
    }

    setSelectedFile(file);
    setForm((current) => ({
      ...current,
      title: current.title || file.name.replace(/\.[^/.]+$/, ""),
    }));
  };

  const uploadArtifact = async () => {
    setValidationAttempted(true);
    setError("");
    setMessage("");
    if (
      !selectedFile ||
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
    let uploadedPath: string | null = null;
    try {
      const id = crypto.randomUUID();
      const uploadedFile = await uploadPortfolioArtifact(selectedFile, id);
      uploadedPath = uploadedFile.path;
      const artifact: ArtifactRecord = {
        id,
        fileName: selectedFile.name,
        title: form.title.trim(),
        description: form.description.trim(),
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        subject: form.subject,
        domain: form.domain,
        plo: form.plo,
        uploadedAt: new Date().toISOString(),
        storagePath: uploadedFile.path,
        objectUrl: uploadedFile.publicUrl,
      };
      const nextArtifacts = [artifact, ...artifacts];
      await setPortfolioItem(STORAGE_KEY, JSON.stringify(nextArtifacts));
      setArtifacts(nextArtifacts);
      setSelectedFile(null);
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
      if (uploadedPath) {
        try {
          await deletePortfolioArtifact(uploadedPath);
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
    if (!window.confirm(`Delete "${artifact.title}"? This action cannot be undone.`)) {
      return;
    }

    setError("");
    setMessage("");
    try {
      if (artifact.storagePath) {
        await deletePortfolioArtifact(artifact.storagePath);
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
    fileError || (validationAttempted && !selectedFile ? "Choose a file before uploading." : "");
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
            <span>{selectedFile ? selectedFile.name : "Choose a file to upload"}</span>
            <small>PDF, office documents, presentations, or images · maximum 10 MB</small>
            <input
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              onChange={handleFile}
              aria-invalid={Boolean(fileValidationMessage)}
              aria-describedby={fileValidationMessage ? "artifact-file-error" : undefined}
            />
          </label>
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
          artifacts.map((artifact) => (
            <article className="artifact-row" key={artifact.id}>
              <span className="file-icon">
                {artifact.fileType.startsWith("image/") ? "IMG" : "DOC"}
              </span>
              <div className="artifact-row-copy">
                <strong>{artifact.title}</strong>
                <small>
                  {artifact.fileName} · {formatFileSize(artifact.fileSize)} · {artifact.subject}
                </small>
                {artifact.description && <p>{artifact.description}</p>}
                <small>
                  {artifact.domain || "No domain"} · {artifact.plo || "No PLO"} ·{" "}
                  {new Date(artifact.uploadedAt).toLocaleDateString()}
                </small>
              </div>
              <span className="artifact-state">{artifact.objectUrl ? "Public" : "File needs re-upload"}</span>
              {artifact.objectUrl && (
                <>
                  <a
                    className="text-button"
                    href={artifact.objectUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Preview
                  </a>
                  <a className="text-button" href={artifact.objectUrl} download={artifact.fileName}>
                    Download
                  </a>
                </>
              )}
              {!readOnly && <button className="danger-button" onClick={() => deleteArtifact(artifact)}>Delete</button>}
            </article>
          ))
        )}
      </section>
    </>
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
