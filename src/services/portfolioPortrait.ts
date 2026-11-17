import { supabase } from "./supabase";

const bucketName = "portfolio-portraits";
const portraitPath = "owner/portrait";
const legacyPortraitUploads = new Map<string, Promise<string>>();

export function getPortfolioPortraitUrl() {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(portraitPath);
  return `${data.publicUrl}?v=${Date.now()}`;
}

export async function uploadPortfolioPortrait(file: Blob) {
  const { error } = await supabase.storage.from(bucketName).upload(portraitPath, file, {
    cacheControl: "0",
    contentType: file.type,
    upsert: true,
  });

  if (error) {
    throw error;
  }

  return getPortfolioPortraitUrl();
}

export function syncLegacyPortfolioPortrait(dataUrl: string) {
  const existingUpload = legacyPortraitUploads.get(dataUrl);
  if (existingUpload) {
    return existingUpload;
  }

  const upload = fetch(dataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("The previously saved portrait could not be read.");
      }

      return response.blob();
    })
    .then(uploadPortfolioPortrait);

  legacyPortraitUploads.set(dataUrl, upload);
  void upload.then(
    () => legacyPortraitUploads.delete(dataUrl),
    () => legacyPortraitUploads.delete(dataUrl),
  );
  return upload;
}

export async function deletePortfolioPortrait() {
  const { error } = await supabase.storage.from(bucketName).remove([portraitPath]);

  if (error) {
    throw error;
  }
}
