import { ChangeEvent, useEffect, useState } from "react";
import { level1Subjects } from "../data/level1Content";

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
  const savedArtifacts = localStorage.getItem(STORAGE_KEY);

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

export default function ArtifactsPage() {
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
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedArtifacts = artifacts.map((artifact) => ({
      id: artifact.id,
      fileName: artifact.fileName,
      title: artifact.title,
      description: artifact.description,
      fileType: artifact.fileType,
      fileSize: artifact.fileSize,
      subject: artifact.subject,
      domain: artifact.domain,
      plo: artifact.plo,
      uploadedAt: artifact.uploadedAt,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedArtifacts));
  }, [artifacts]);

  const updateForm = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    setSelectedFile(null);
    setError("");

    if (!file) {
      return;
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError(
        "This file type is not supported. Choose a PDF, office document, image, or presentation.",
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("This file is larger than the 10 MB limit.");
      return;
    }

    setSelectedFile(file);
    setForm((current) => ({
      ...current,
      title: current.title || file.name.replace(/\.[^/.]+$/, ""),
    }));
  };

  const uploadArtifact = () => {
    if (!selectedFile) {
      setError("Choose a file before uploading.");
      return;
    }

    if (!form.title.trim()) {
      setError("Add a title for this artifact.");
      return;
    }

    if (
      !form.confidentiality ||
      !form.references ||
      !form.collaborators ||
      !form.permissions ||
      !form.aiUse
    ) {
      setError(
        "Complete all confidentiality, permission, collaboration, and AI-use acknowledgements.",
      );
      return;
    }

    setProgress(10);
    setMessage("");
    setError("");
    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(progressTimer);
          return 100;
        }
        return Math.min(current + 15, 100);
      });
    }, 100);

    window.setTimeout(() => {
      const artifact: ArtifactRecord = {
        id: crypto.randomUUID(),
        fileName: selectedFile.name,
        title: form.title.trim(),
        description: form.description.trim(),
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        subject: form.subject,
        domain: form.domain,
        plo: form.plo,
        uploadedAt: new Date().toISOString(),
        objectUrl: URL.createObjectURL(selectedFile),
      };
      setArtifacts((current) => [artifact, ...current]);
      setSelectedFile(null);
      setProgress(100);
      setMessage("Artifact uploaded to this private prototype portfolio.");
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
    }, 800);
  };

  const deleteArtifact = (artifact: ArtifactRecord) => {
    if (!window.confirm(`Delete "${artifact.title}"? This action cannot be undone.`)) {
      return;
    }

    if (artifact.objectUrl) {
      URL.revokeObjectURL(artifact.objectUrl);
    }
    setArtifacts((current) => current.filter((item) => item.id !== artifact.id));
    setMessage("Artifact deleted.");
  };

  const selectedSubject = level1Subjects.find((subject) => subject.code === form.subject);
  const domains = selectedSubject?.domains ?? [];

  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">Your evidence</p>
        <h1>Artifacts</h1>
        <p>Keep academic evidence private, organized, and connected to your learning.</p>
      </div>
      <div className="notice yellow-note artifact-warning">
        <strong>Patient confidentiality warning</strong>
        <span>
          Do not upload patient names, faces, dates, record numbers, or any other identifying
          details. Use de-identified academic evidence only.
        </span>
      </div>
      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}
      <section className="artifact-upload-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Add evidence</p>
            <h2>Upload an artifact</h2>
          </div>
          <span className="private-label">Private by default</span>
        </div>
        <label className="artifact-file-picker">
          <span>{selectedFile ? selectedFile.name : "Choose a file to upload"}</span>
          <small>PDF, office documents, presentations, or images · maximum 10 MB</small>
          <input type="file" accept={ACCEPTED_TYPES.join(",")} onChange={handleFile} />
        </label>
        <div className="artifact-form-grid">
          <label>
            Title
            <input
              value={form.title}
              onChange={(event) => updateForm("title", event.target.value)}
              placeholder="Artifact title"
            />
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
            checked={form.confidentiality}
            onChange={(value) => updateForm("confidentiality", value)}
            text="I confirm this file contains no patient-identifying or confidential information."
          />
          <Acknowledgement
            checked={form.references}
            onChange={(value) => updateForm("references", value)}
            text="I have acknowledged references and sources used in this artifact."
          />
          <Acknowledgement
            checked={form.collaborators}
            onChange={(value) => updateForm("collaborators", value)}
            text="I have identified collaborators and my own contribution."
          />
          <Acknowledgement
            checked={form.permissions}
            onChange={(value) => updateForm("permissions", value)}
            text="I have permission to include and share this academic artifact privately."
          />
          <Acknowledgement
            checked={form.aiUse}
            onChange={(value) => updateForm("aiUse", value)}
            text="I have disclosed any artificial-intelligence use required by academic policy."
          />
        </div>
        {progress > 0 && progress < 100 && (
          <div className="upload-progress" aria-label={`Upload progress ${progress}%`}>
            <div style={{ width: `${progress}%` }} />
            <span>Preparing private upload... {progress}%</span>
          </div>
        )}
        <button className="primary-button compact-button" onClick={uploadArtifact}>
          Upload privately
        </button>
      </section>
      <section className="list-card artifact-list">
        <div className="list-header">
          <div>
            <p className="eyebrow">Your evidence</p>
            <h2>Uploaded artifacts</h2>
          </div>
          <span className="private-label">{artifacts.length} private</span>
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
              <span className="artifact-state">Private</span>
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
              <button className="danger-button" onClick={() => deleteArtifact(artifact)}>
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </>
  );
}

function Acknowledgement({
  checked,
  onChange,
  text,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  text: string;
}) {
  return (
    <label className="artifact-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{text}</span>
    </label>
  );
}
