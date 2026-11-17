import { supabase } from "./supabase";

const bucketName = "portfolio-artifacts";

export async function uploadPortfolioArtifact(file: File, artifactId: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("Sign in as the portfolio owner before uploading an artifact.");
  }

  const path = `${user.id}/${artifactId}/file`;
  const { error } = await supabase.storage.from(bucketName).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export async function deletePortfolioArtifact(path: string) {
  const { error } = await supabase.storage.from(bucketName).remove([path]);

  if (error) {
    throw error;
  }
}
